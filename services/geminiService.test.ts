import { describe, it, expect, vi } from 'vitest';
import { improvePrompt } from './geminiService';
import { GoogleGenAI } from '@google/genai';

vi.mock('@google/genai', () => {
  const mockGenerateContent = vi.fn();
  const mockGoogleGenAI = {
    models: {
      generateContent: mockGenerateContent,
    },
  };
  return {
    GoogleGenAI: vi.fn(() => mockGoogleGenAI),
    __esModule: true,
    default: vi.fn(() => mockGoogleGenAI),
  };
});

describe('improvePrompt', () => {
  it('should return the improved prompt text', async () => {
    const mockResponse = {
      response: {
        text: () => 'a beautifully improved prompt',
        candidates: [],
        usageMetadata: {
          promptTokenCount: 0,
          candidatesTokenCount: 0,
          totalTokenCount: 0,
        }
      },
    };

    const genAI = new GoogleGenAI({apiKey: 'test-key'});
    (genAI.models.generateContent as vi.Mock).mockResolvedValue(mockResponse);

    const prompt = 'improve this';
    const result = await improvePrompt(prompt);
    expect(result).toBe('a beautifully improved prompt');
  });
});