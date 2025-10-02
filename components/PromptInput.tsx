import React from 'react';
import { useI18n } from '../i18n/i18n';
import { Tooltip } from './Tooltip';
import { Spinner } from './Spinner';

interface PromptInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onImprove: () => void;
  isImproving: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onValueChange, onImprove, isImproving }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-center">
        <Tooltip text={t('tooltip.improvePrompt')} position="top">
            <button
                onClick={onImprove}
                disabled={isImproving || !value}
                className="icon-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isImproving ? (
                    <Spinner />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zM10.06 2.47a.75.75 0 01.53 1.28l-3.03 3.03a.75.75 0 11-1.06-1.06l3.03-3.03a.75.75 0 01.53-.22zm-4.53 4.53l3.03-3.03a.75.75 0 011.06 1.06l-3.03 3.03a.75.75 0 01-1.06-1.06zM13.5 9a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zm2.47 1.06a.75.75 0 011.28-.53l3.03 3.03a.75.75 0 11-1.06 1.06l-3.03-3.03a.75.75 0 01-.22-.53zm4.53 4.53l-3.03 3.03a.75.75 0 11-1.06-1.06l3.03-3.03a.75.75 0 011.06 1.06zM15 13.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zm-1.06 2.47a.75.75 0 01.53 1.28l-3.03 3.03a.75.75 0 11-1.06-1.06l3.03-3.03a.75.75 0 01.53-.22zm-4.53 4.53l3.03-3.03a.75.75 0 011.06 1.06l-3.03 3.03a.75.75 0 01-1.06-1.06z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </Tooltip>
      </div>
      <textarea
        id="prompt-textarea"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={t('prompt.placeholder')}
        rows={6}
        className="w-full p-3 bg-[var(--control-bg)] border border-transparent rounded-lg text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--accent-primary-hover)] focus:border-transparent transition-all duration-200 placeholder-[var(--text-secondary)]"
      />
    </div>
  );
};