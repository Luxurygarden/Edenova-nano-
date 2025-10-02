import React from 'react';
import { useI18n } from '../i18n/i18n';

interface ImageAnalysisDisplayProps {
  description: string | null;
  isLoading: boolean;
}

const LoadingState: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col items-center justify-center gap-3 text-center">
             <div className="relative w-12 h-12 text-[var(--accent-primary)]">
                <svg className="w-full h-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx="18" cy="18" r="16" fill="none"
                        className="stroke-current text-gray-200 dark:text-gray-700"
                        strokeWidth="2"
                    ></circle>
                    <g className="origin-center -rotate-90">
                        <circle
                            cx="18" cy="18" r="16" fill="none"
                            className="stroke-current text-[var(--accent-primary)]"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="75"
                        ></circle>
                    </g>
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{t('analysis.inProgress')}</p>
        </div>
    );
}


export const ImageAnalysisDisplay: React.FC<ImageAnalysisDisplayProps> = ({ description, isLoading }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-2 flex-grow p-3 rounded-lg bg-[var(--control-bg)] w-full min-h-[6rem]">
      <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{t('analysis.title')}</h3>
      <div className="text-sm text-[var(--text-secondary)] flex-grow flex items-center justify-center">
        {isLoading && <LoadingState />}
        {!isLoading && description && <p>{description}</p>}
        {!isLoading && !description && <p>{t('analysis.error')}</p>}
      </div>
    </div>
  );
};