import React from 'react';
import { useI18n } from '../i18n/i18n';

interface PromptGuidanceProps {
  onSelectPrompt: (prompt: string) => void;
  suggestions: string[];
  isOpen?: boolean; // For modal control on mobile
  onClose?: () => void; // For modal control on mobile
}

const tipKeys = [
    'prompt.guidance.tip1',
    'prompt.guidance.tip2',
    'prompt.guidance.tip3',
];


export const PromptGuidance: React.FC<PromptGuidanceProps> = ({ onSelectPrompt, suggestions, isOpen, onClose }) => {
  const { t } = useI18n();

  const tips = tipKeys.map(key => t(key as any));
  const hasSuggestions = suggestions.length > 0;
  
  const content = (
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
              {hasSuggestions ? t('prompt.guidance.personalizedSuggestions') : t('prompt.guidance.title')}
            </h3>
            {onClose && (
                 <button onClick={onClose} className="p-1 rounded-full text-[var(--text-secondary)] hover:bg-[var(--control-bg-hover)] hover:text-[var(--text-primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
            )}
        </div>
      
      {hasSuggestions && (
          <div className="flex flex-col gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSelectPrompt(suggestion)}
                className="text-left text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 p-2 rounded-md bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)]"
              >
               › {suggestion}
              </button>
            ))}
          </div>
      )}

       <div className="flex flex-col gap-2">
         {tips.map((tip, index) => (
             <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-sky-500/10 dark:bg-sky-400/10 text-sky-700 dark:text-sky-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{tip}</span>
            </div>
         ))}
      </div>
    </div>
  );
  
  if (isOpen) { // Modal view for mobile
      return (
        <div 
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="glass-card rounded-xl p-6 w-full max-w-md"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {content}
            </div>
        </div>
      )
  }
  
  // Default sidebar view for desktop
  return content;
};