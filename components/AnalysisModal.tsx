import React from 'react';
import { useI18n } from '../i18n/i18n';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, children }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-xl p-6 w-full max-w-md flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-end">
             <button onClick={onClose} className="p-1 rounded-full text-[var(--text-secondary)] hover:bg-[var(--control-bg-hover)] hover:text-[var(--text-primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
        </div>
        {children}
      </div>
    </div>
  );
};