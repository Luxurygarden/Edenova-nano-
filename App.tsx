import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { editImageWithNanoBanana, editImageWithInpainting, improvePrompt, analyzeImageForSuggestions } from './services/geminiService';
import { useI18n } from './i18n/i18n';
import { MaskingEditor } from './components/MaskingEditor';
import { PromptGuidance } from './components/PromptGuidance';
import { ImageAnalysisDisplay } from './components/ImageAnalysisDisplay';
import { Tooltip } from './components/Tooltip';
import { AnalysisModal } from './components/AnalysisModal';
import { OnboardingTour } from './components/OnboardingTour';
import { SettingsModal } from './components/SettingsModal';
import { UpgradeModal } from './components/UpgradeModal';
import { useAuth } from './contexts/AuthContext';


interface OriginalImage {
  file: File;
  base64: string;
  mimeType: string;
}

export interface EditResult {
  image: string | null;
  text: string | null;
  mimeType?: string;
}

interface RefinementData {
    prompt: string;
    baseImage: EditResult;
}

export interface ImageAnalysisResult {
    description: string;
    suggestions: string[];
}


const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target?.result as string);
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
    });
};

const convertAvifToPng = (avifDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            } else {
                reject(new Error("Could not get canvas context for image conversion."));
            }
        };
        img.onerror = err => reject(new Error(`Failed to load AVIF image for conversion: ${JSON.stringify(err)}`));
        img.src = avifDataUrl;
    });
};


const App: React.FC = () => {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<EditResult | null>(null);
  const [history, setHistory] = useState<EditResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isMasking, setIsMasking] = useState<boolean>(false);
  const [refinementData, setRefinementData] = useState<RefinementData | null>(null);
  const [isImproving, setIsImproving] = useState<boolean>(false);
  
  const [imageAnalysis, setImageAnalysis] = useState<Record<string, ImageAnalysisResult>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState<boolean>(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);


  useEffect(() => {
    let frameId: number | null = null;
    
    // Check if the tour has been completed
    const hasCompletedTour = localStorage.getItem('hasCompletedTour');
    if (hasCompletedTour !== 'true') {
        setIsTourActive(true);
    }


    const handleMouseMove = (event: MouseEvent) => {
        if (frameId) {
            cancelAnimationFrame(frameId);
        }

        frameId = requestAnimationFrame(() => {
            const { clientX, clientY } = event;
            const x = Math.round((clientX / window.innerWidth) * 100);
            const y = Math.round((clientY / window.innerHeight) * 100);
            document.documentElement.style.setProperty('--mouse-x', `${x}%`);
            document.documentElement.style.setProperty('--mouse-y', `${y}%`);
        });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        if (frameId) {
            cancelAnimationFrame(frameId);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        document.documentElement.style.removeProperty('--mouse-x');
        document.documentElement.style.removeProperty('--mouse-y');
    };
  }, []);

  const runAnalysis = useCallback(async (image: OriginalImage, lang: string) => {
      setIsAnalyzing(true);
      try {
          const analysisResult = await analyzeImageForSuggestions(image.base64.split(',')[1], image.mimeType, lang);
          setImageAnalysis(prev => ({ ...prev, [lang]: analysisResult }));
      } catch (analysisErr) {
          console.error(`Image analysis failed for lang ${lang}:`, analysisErr);
          setError(t('error.analysisFailed')); 
      } finally {
          setIsAnalyzing(false);
      }
  }, [t]);

  useEffect(() => {
      if (originalImage && !imageAnalysis[language]) {
          runAnalysis(originalImage, language);
      }
  }, [language, originalImage, imageAnalysis, runAnalysis]);

  const handleTourFinish = () => {
    localStorage.setItem('hasCompletedTour', 'true');
    setIsTourActive(false);
  };


  const handleImageUpload = async (file: File) => {
    try {
      let base64 = await fileToDataUrl(file);
      let mimeType = file.type;

      if (mimeType === 'image/avif') {
        base64 = await convertAvifToPng(base64);
        mimeType = 'image/png';
      }
      
      const newImage = { file, base64, mimeType };

      setOriginalImage(newImage);
      setResult(null);
      setError(null);
      setHistory([]); // Clear history on new image
      setImageAnalysis({}); // Clear all analyses

      // Start AI analysis for the current language
      runAnalysis(newImage, language);

    } catch (err) {
      console.error(err);
      setError(t('error.fileRead'));
    }
  };

  const handleClearImage = () => {
    setOriginalImage(null);
    setResult(null);
    setHistory([]);
    setPrompt('');
    setImageAnalysis({});
    setError(null);
  }

  const handleGenerate = useCallback(async () => {
    const imageSource = originalImage;
    if (!imageSource || !prompt) {
      setError(t('error.noImageOrPrompt'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64Data = imageSource.base64.split(',')[1];
      
      const newResult = await editImageWithNanoBanana(base64Data, imageSource.mimeType, prompt);
      const resultWithMime = {...newResult, mimeType: imageSource.mimeType };
      setResult(resultWithMime);
      setHistory(prev => [...prev, resultWithMime]);

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message === 'AI_GENERATION_FAILED_PERMANENTLY') {
            setError(t('error.aiGenerationFailedPermanently'));
        } else {
            setError(t('error.aiApiError', { message: err.message }));
        }
      } else {
        setError(t('error.generic'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, t]);
  
  const handleSimpleRefine = useCallback(async (baseImageResult: EditResult, refinementPrompt: string) => {
    if (!baseImageResult?.image) return;

    setIsLoading(true);
    setError(null);

    try {
      const base64Data = baseImageResult.image.split(',')[1];
      const mimeType = baseImageResult.mimeType || 'image/png';
      const newResult = await editImageWithNanoBanana(base64Data, mimeType, refinementPrompt);
      const resultWithMime = {...newResult, mimeType };
      setResult(resultWithMime);
      setHistory(prev => [...prev, resultWithMime]);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message === 'AI_GENERATION_FAILED_PERMANENTLY') {
            setError(t('error.aiGenerationFailedPermanently'));
        } else {
            setError(t('error.aiApiError', { message: err.message }));
        }
      } else {
        setError(t('error.generic'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleStartMasking = useCallback((refinementPrompt: string) => {
    if (!result) return;
    setRefinementData({ prompt: refinementPrompt, baseImage: result });
    setIsMasking(true);
  }, [result]);

  const handleMaskConfirm = useCallback(async (maskData: string) => {
      if (!refinementData) return;

      setIsMasking(false);
      setIsLoading(true);
      setError(null);

      const { baseImage, prompt } = refinementData;
      
      try {
          const base64ImageData = baseImage.image!.split(',')[1];
          const base64MaskData = maskData.split(',')[1];
          const mimeType = baseImage.mimeType || 'image/png';

          const newResult = await editImageWithInpainting(base64ImageData, mimeType, base64MaskData, prompt);
          const resultWithMime = {...newResult, mimeType };
          setResult(resultWithMime);
          setHistory(prev => [...prev, resultWithMime]);

      } catch (err) {
          console.error(err);
          if (err instanceof Error) {
            if (err.message === 'AI_GENERATION_FAILED_PERMANENTLY') {
                setError(t('error.aiGenerationFailedPermanently'));
            } else {
                setError(t('error.aiApiError', { message: err.message }));
            }
          } else {
            setError(t('error.generic'));
          }
      } finally {
          setIsLoading(false);
          setRefinementData(null);
      }
  }, [refinementData, t]);

  const handleMaskCancel = () => {
    setIsMasking(false);
    setRefinementData(null);
  };

  const handleImprovePrompt = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsImproving(true);
    setError(null);
    try {
        const improved = await improvePrompt(prompt);
        setPrompt(improved);
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            setError(t('error.aiApiError', { message: err.message }));
        } else {
            setError(t('error.generic'));
        }
    } finally {
        setIsImproving(false);
    }
  }, [prompt, t]);


  const handleSelectHistory = (selectedResult: EditResult) => {
    setResult(selectedResult);
  };

  const imagePreviewUrl = originalImage?.base64 ?? null;
  const hasImage = !!imagePreviewUrl;
  const currentAnalysis = imageAnalysis[language];
  const isPremium = user?.plan === 'PRO';

  return (
    <div className="min-h-screen w-screen overflow-x-hidden font-sans flex flex-col">
      <OnboardingTour isOpen={isTourActive} onClose={handleTourFinish} />
      <Header onSettingsClick={() => setIsSettingsModalOpen(true)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />

      {isMasking && refinementData && (
          <MaskingEditor
              src={refinementData.baseImage.image!}
              onConfirm={handleMaskConfirm}
              onCancel={handleMaskCancel}
          />
      )}
      {hasImage && isGuidanceOpen && (
          <PromptGuidance 
            onSelectPrompt={setPrompt} 
            suggestions={currentAnalysis?.suggestions ?? []}
            isOpen={isGuidanceOpen}
            onClose={() => setIsGuidanceOpen(false)}
          />
      )}
       {hasImage && isAnalysisModalOpen && (
          <AnalysisModal
            isOpen={isAnalysisModalOpen}
            onClose={() => setIsAnalysisModalOpen(false)}
          >
             <ImageAnalysisDisplay 
                description={currentAnalysis?.description ?? null}
                isLoading={isAnalyzing || !currentAnalysis}
             />
          </AnalysisModal>
      )}
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Control Panel */}
        <div className="flex flex-col gap-8">
            {/* Section 1: Upload */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 anim-fade-in-slide-up-1">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] text-center uppercase text-glow">{t('section.upload')}</h2>
                <div className={`flex flex-col md:flex-row gap-4 ${hasImage ? 'items-center md:items-start' : 'items-center'}`}>
                    <ImageUploader
                      onImageUpload={handleImageUpload}
                      imagePreviewUrl={imagePreviewUrl}
                      onClear={handleClearImage}
                    />
                    {hasImage && (
                        <div className="flex flex-col gap-2 flex-grow w-full">
                           <div className="hidden md:flex flex-grow w-full">
                               <ImageAnalysisDisplay 
                                  description={currentAnalysis?.description ?? null}
                                  isLoading={isAnalyzing || !currentAnalysis}
                               />
                           </div>

                           <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                               <Tooltip text={t('tooltip.showAnalysis')}>
                                    <button onClick={() => setIsAnalysisModalOpen(true)} className="flex items-center justify-center gap-2 text-sm font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 5.555a1 1 0 00-1.9 1.342l1.33 2.661a1 1 0 001.902-.951l-1.332-2.662zM10 12a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                                        {t('analysis.title')}
                                    </button>
                               </Tooltip>
                               <Tooltip text={t('tooltip.getIdeas')}>
                                    <button onClick={() => setIsGuidanceOpen(true)} className="flex items-center justify-center gap-2 text-sm font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 px-4 py-2 rounded-lg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.706-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-10.607a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414L5.05 5.05a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" /></svg>
                                        {t('prompt.guidance.getIdeas')}
                                    </button>
                               </Tooltip>
                           </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: Vision */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 anim-fade-in-slide-up-2">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] text-center uppercase text-glow">{t('section.describe')}</h2>
                <PromptInput
                  value={prompt}
                  onValueChange={setPrompt}
                  onImprove={handleImprovePrompt}
                  isImproving={isImproving}
                />
            </div>

            {/* Section 3: Generate */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 anim-fade-in-slide-up-3">
                 <h2 className="text-lg font-semibold text-[var(--text-primary)] text-center uppercase text-glow">{t('section.preview')}</h2>
                  <button
                    id="generate-button"
                    onClick={handleGenerate}
                    disabled={!hasImage || !prompt || isLoading}
                    className="w-full btn-primary font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading && !isMasking ? <Spinner /> : null}
                    <span>{isLoading && !isMasking ? t('generateButton.loading') : t('generateButton.design')}</span>
                  </button>
                 <ResultDisplay.View3DButton />
            </div>
        </div>
        
        {/* Result Panel */}
        <div id="result-panel" className="glass-card rounded-2xl p-6 h-full flex flex-col anim-fade-in-slide-up-2">
            <ResultDisplay 
              result={result} 
              isLoading={isLoading} 
              error={error} 
              originalImageUrl={imagePreviewUrl}
              history={history}
              onSelectHistory={handleSelectHistory}
              activeResult={result}
              onSimpleRefine={handleSimpleRefine}
              isPremium={isPremium}
              onUpgradeClick={() => setIsUpgradeModalOpen(true)}
            />
        </div>
      </main>
    </div>
  );
};

export default App;