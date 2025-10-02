import React, { useState } from 'react';
import { Spinner } from './Spinner';
import { useI18n } from '../i18n/i18n';
import { Tooltip } from './Tooltip';
import { EditResult } from '../App';
import { ComparisonSlider } from './ComparisonSlider';
import { HistoryRail } from './HistoryRail';
import { RefinementPanel } from './RefinementPanel';

interface ResultDisplayProps {
  result: EditResult | null;
  isLoading: boolean;
  error: string | null;
  originalImageUrl: string | null;
  history: EditResult[];
  onSelectHistory: (result: EditResult) => void;
  activeResult: EditResult | null;
  onSimpleRefine: (baseImage: EditResult, prompt: string) => void;
  isPremium: boolean;
  onUpgradeClick: () => void;
}

const Placeholder: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] text-center p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4 opacity-50 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">{t('result.placeholder.title')}</h3>
            <p className="mt-2 max-w-sm">{t('result.placeholder.description')}</p>
        </div>
    );
}

const View3DButton: React.FC = () => {
    const { t } = useI18n();
    return (
        <Tooltip text={t('tooltip.view3D')} position="top">
            <button
              className="w-full btn-secondary font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.732l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.732l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96l8.74 5.04 8.74-5.04M12 22.08V12" />
                </svg>
                {t('result.view3D')}
            </button>
        </Tooltip>
    );
};


const ResultDisplayComponent: React.FC<ResultDisplayProps> = ({ result, isLoading, error, originalImageUrl, history, onSelectHistory, activeResult, onSimpleRefine, isPremium, onUpgradeClick }) => {
  const { t } = useI18n();
  const [isComparing, setIsComparing] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const handleDownload = async () => {
    if (!result?.image) return;

    const fileName = `ai-design-${Date.now()}.png`;

    try {
      const response = await fetch(result.image);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: t('share.title'),
          text: t('share.text'),
        });
        return;
      }
    } catch (e) {
      console.error('Web Share API failed, falling back to download.', e);
    }

    try {
      const link = document.createElement('a');
      link.href = result.image;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Download failed.', e);
      alert(t('error.downloadFailed'));
    }
  };

  const handleDownloadAll = async () => {
    if (history.length < 1 || isDownloadingAll) return;
    setIsDownloadingAll(true);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < history.length; i++) {
        const item = history[i];
        if (item.image) {
            try {
                const link = document.createElement('a');
                link.href = item.image;
                link.download = `ai-design-session-${i + 1}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                await sleep(500);
            } catch (e) {
                console.error(`Failed to download image ${i + 1}`, e);
            }
        }
    }

    setIsDownloadingAll(false);
  };


  const hasResult = result?.image;
  const showComparison = isComparing && hasResult && originalImageUrl;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-grow flex items-center justify-center bg-black/10 rounded-lg min-h-[20rem] sm:min-h-[30rem] relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-[var(--card-bg)]/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <Spinner large />
            <p className="mt-4 text-lg font-semibold text-[var(--text-primary)] animate-pulse">{t('result.loading')}</p>
          </div>
        )}
        {error && (
            <div className="p-4 text-center text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold">{t('result.error.title')}</p>
                <p className="text-sm">{error}</p>
            </div>
        )}
        {!isLoading && !error && !result && <Placeholder />}
        {hasResult && (
          <div className="p-2 sm:p-4 w-full h-full flex flex-col items-center justify-between gap-4">
              <div className="flex-grow flex items-center justify-center w-full min-h-0 relative">
                  {showComparison ? (
                    <ComparisonSlider beforeSrc={originalImageUrl} afterSrc={result.image!} />
                  ) : (
                    <img src={result.image} alt="Generated result" className="object-contain max-h-full max-w-full rounded-lg shadow-2xl" />
                  )}
              </div>
              {result.text && <p className="text-[var(--text-secondary)] italic text-center text-xs sm:text-sm mt-2 flex-shrink-0">{t('result.aiNote', { text: result.text })}</p>}
          </div>
        )}
      </div>
      {hasResult && !isLoading && (
         <div className="flex flex-col gap-4">
            <div className="neon-controls-container">
                <Tooltip text={t('tooltip.download')} position="top">
                  <button onClick={handleDownload} className="neon-button">
                    <div className="neon-icon-circle neon-icon-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                    <span className="neon-text neon-text-blue">{t('result.download')}</span>
                  </button>
                </Tooltip>

                {history.length > 1 && (
                    <Tooltip text={t('tooltip.downloadAll')} position="top">
                      <button
                        onClick={handleDownloadAll}
                        disabled={isDownloadingAll}
                        className="neon-button"
                      >
                        <div className="neon-icon-circle neon-icon-mixed">
                            {isDownloadingAll ? <Spinner colorClass="border-[var(--neon-blue)]" /> : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 3v12m0 0l-4 -4m4 4l4 -4" />
                                    <path d="M20 15h-16" />
                                    <path d="M20 19h-16" />
                                </svg>
                            )}
                        </div>
                        <span className="neon-text neon-text-mixed">{t('result.downloadAll')}</span>
                      </button>
                    </Tooltip>
                )}

                <Tooltip text={t('tooltip.compare')} position="top">
                  <button
                    onClick={() => setIsComparing(!isComparing)}
                    className={`neon-button ${isComparing ? 'active' : ''}`}
                  >
                    <div className="neon-icon-circle neon-icon-pink">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16L3 12m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4" />
                        </svg>
                    </div>
                     <span className="neon-text neon-text-pink">{t('result.compare')}</span>
                  </button>
                </Tooltip>
            </div>
            <RefinementPanel 
              currentImage={result}
              onSimpleRefine={onSimpleRefine}
              isPremium={isPremium}
              onUpgradeClick={onUpgradeClick}
            />
        </div>
      )}
      <HistoryRail history={history} onSelect={onSelectHistory} activeResult={activeResult} />
    </div>
  );
};

export const ResultDisplay = Object.assign(ResultDisplayComponent, { View3DButton });