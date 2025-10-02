import { GoogleGenAI, Modality, GenerateContentResponse, Part, Type } from "@google/genai";
import { ImageAnalysisResult } from '../App';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface EditResult {
  image: string | null;
  text: string | null;
}

// Helper function to get custom API settings from localStorage
const getCustomApiSettings = () => {
    try {
        const settings = localStorage.getItem('apiSettings');
        if (settings) {
            const { url, key } = JSON.parse(settings);
            return { customApiUrl: url, customApiKey: key };
        }
    } catch (error) {
        console.error("Could not parse API settings from localStorage", error);
    }
    return { customApiUrl: null, customApiKey: null };
};


async function callApi(payload: any): Promise<GenerateContentResponse> {
    const { customApiUrl, customApiKey } = getCustomApiSettings();
    
    if (customApiUrl && customApiKey) {
        // Use custom API endpoint
        console.log("Using custom API endpoint:", customApiUrl);
        const response = await fetch(customApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${customApiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Custom API Error: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();

    } else {
        // Use default Gemini SDK
        const { model, ...restPayload } = payload;
        return ai.models.generateContent({ model, ...restPayload });
    }
}


async function processApiResponse(response: GenerateContentResponse): Promise<EditResult> {
    const editResult: EditResult = { image: null, text: null };

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          editResult.text = part.text;
        } else if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          editResult.image = imageUrl;
        }
      }
    }

    if (!editResult.image) {
      throw new Error("AI_NO_IMAGE_RETURNED");
    }

    return editResult;
}

async function generateImageWithRetries(generationFn: () => Promise<GenerateContentResponse>): Promise<EditResult> {
    const MAX_RETRIES = 3;
    let lastError: unknown = null;

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await generationFn();
            const result = await processApiResponse(response); // Throws "AI_NO_IMAGE_RETURNED" on failure
            return result; // Success
        } catch (error: any) {
            lastError = error;
            console.warn(`Image generation attempt ${i + 1} of ${MAX_RETRIES} failed. Retrying...`, error);
            
            const errorStatus = error?.error?.status;
            if (['UNAUTHENTICATED', 'INVALID_ARGUMENT', 'RESOURCE_EXHAUSTED'].includes(errorStatus)) {
                console.error(`Non-retriable error encountered: ${errorStatus}. Aborting retries.`);
                break; 
            }

            if (i < MAX_RETRIES - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }
    
    console.error("All image generation retries failed. The final error was:", lastError);
    throw new Error("AI_GENERATION_FAILED_PERMANENTLY");
}


export async function editImageWithNanoBanana(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditResult> {
    const generationFn = () => callApi({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data: base64ImageData, mimeType: mimeType } },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    try {
        return await generateImageWithRetries(generationFn);
    } catch (error) {
        console.error("Error editing image with API (NanoBanana):", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("UNKNOWN_API_ERROR");
    }
}

export async function editImageWithInpainting(
  base64ImageData: string,
  mimeType: string,
  base64MaskData: string,
  prompt: string
): Promise<EditResult> {
    const generationFn = () => {
        const imagePart: Part = { inlineData: { data: base64ImageData, mimeType: mimeType } };
        const maskPart: Part = { inlineData: { data: base64MaskData, mimeType: 'image/png' } };
        const textPart: Part = { text: prompt };

        return callApi({
          model: 'gemini-2.5-flash-image-preview',
          contents: { parts: [imagePart, maskPart, textPart] },
          config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
          },
        });
    };
  
    try {
        return await generateImageWithRetries(generationFn);
    } catch (error) {
        console.error("Error with inpainting via API:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("UNKNOWN_API_ERROR");
    }
}

export async function improvePrompt(prompt: string): Promise<string> {
  if (!prompt) {
      return "";
  }
  try {
    const response = await callApi({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: "You are a prompt engineering expert. Your task is to refine the user's prompt for an AI image generation model. Rewrite the prompt to be clearer, more concise, and more effective for the AI, ensuring it directly corresponds to the user's intent. Do not add new elements or concepts not present in the original prompt. The goal is to improve the AI's understanding and maintain the original vision's consistency. Return only the rewritten prompt, with no preamble or explanation.",
        },
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error improving prompt with API:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("UNKNOWN_API_ERROR");
  }
}

export async function analyzeImageForSuggestions(base64ImageData: string, mimeType: string, language: string): Promise<ImageAnalysisResult> {
    try {
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };
        
        const response = await callApi({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart] },
            config: {
                systemInstruction: `You are a helpful and creative landscape design assistant.
                Your task is to analyze the user's garden photo and provide two things in a JSON object, in the specified language: ${language}.
                1.  A detailed, objective description of the key elements and zones in the image (e.g., terrace material, fence type, existing plants, lawn condition). Keep this description concise, under 500 characters.
                2.  A list of 3-4 creative and actionable suggestions for improvement, presented as complete sentences that could be used as prompts. These suggestions should be directly inspired by the elements you identified in the description.

                Example output for a simple garden (if language was 'en'):
                {
                  "description": "The image shows a small backyard with a worn-out lawn and a simple wooden fence. In the corner, there is a plastic children's slide.",
                  "suggestions": [
                    "Replace the worn-out lawn with lush, new sod and add a stone pathway leading to the back.",
                    "Paint the wooden fence a modern charcoal gray and plant climbing jasmine along its base.",
                    "Create a dedicated play area with a new sandbox and soft rubber mulch where the slide is.",
                    "Introduce a flower bed with colorful, low-maintenance perennials along the fence line."
                  ]
                }`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING },
                        suggestions: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                    },
                },
            },
        });

        const jsonStr = response.text.trim();
        const parsedResult = JSON.parse(jsonStr);

        if (typeof parsedResult.description === 'string' && Array.isArray(parsedResult.suggestions)) {
            return parsedResult;
        } else {
            throw new Error("Invalid JSON structure from analysis API.");
        }

    } catch (error) {
        console.error("Error analyzing image with API:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("UNKNOWN_API_ERROR");
    }
}