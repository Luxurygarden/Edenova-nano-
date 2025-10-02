import React from 'react';
import { useI18n } from '../i18n/i18n';
import { useAuth } from '../contexts/AuthContext';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const { upgrade } = useAuth();
  
  if (!isOpen) return null;

  const handleUpgrade = () => {
    upgrade();
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="glass-card rounded-xl p-8 w-full flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-amber-400/20 rounded-full text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] text-glow">{t('upgrade.modal.title')}</h2>
            <p className="text-base text-[var(--text-secondary)]">{t('upgrade.modal.description')}</p>
            <div className="flex gap-4 mt-4 w-full">
                <button onClick={onClose} className="w-full btn-secondary font-bold py-3 px-6 rounded-lg">
                    {t('cropper.cancel')}
                </button>
                <button onClick={handleUpgrade} className="w-full btn-primary font-bold py-3 px-6 rounded-lg">
                    {t('upgrade.modal.button')}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};