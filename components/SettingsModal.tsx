import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/i18n';
import { useSettings } from '../contexts/SettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const { settings, saveSettings, resetSettings } = useSettings();
  const [currentUrl, setCurrentUrl] = useState(settings.url);
  const [currentKey, setCurrentKey] = useState(settings.key);

  useEffect(() => {
    setCurrentUrl(settings.url);
    setCurrentKey(settings.key);
  }, [settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSettings({ url: currentUrl, key: currentKey });
    onClose();
  };

  const handleReset = () => {
    resetSettings();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="glass-card rounded-xl p-6 w-full flex flex-col gap-4">
                <h2 className="text-xl font-bold text-center text-[var(--text-primary)] text-glow">{t('settings.title')}</h2>
                
                <div className="flex flex-col gap-2 border-t border-[var(--card-border)] pt-4">
                    <h3 className="font-semibold text-[var(--text-primary)]">{t('settings.customApi.title')}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{t('settings.customApi.description')}</p>
                    <div className="flex flex-col gap-2 mt-2">
                        <label htmlFor="apiUrl" className="text-xs font-bold uppercase text-[var(--text-secondary)]">{t('settings.customApi.url')}</label>
                        <input
                            id="apiUrl"
                            type="text"
                            value={currentUrl}
                            onChange={(e) => setCurrentUrl(e.target.value)}
                            placeholder="https://your-api.com/generate"
                            className="w-full p-2 bg-[var(--control-bg)] border border-transparent rounded-lg text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--accent-primary-hover)] focus:border-transparent transition-all duration-200 placeholder-[var(--text-secondary)]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <label htmlFor="apiKey" className="text-xs font-bold uppercase text-[var(--text-secondary)]">{t('settings.customApi.key')}</label>
                        <input
                            id="apiKey"
                            type="password"
                            value={currentKey}
                            onChange={(e) => setCurrentKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full p-2 bg-[var(--control-bg)] border border-transparent rounded-lg text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--accent-primary-hover)] focus:border-transparent transition-all duration-200 placeholder-[var(--text-secondary)]"
                        />
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-4 border-t border-[var(--card-border)] pt-4">
                    <button onClick={handleReset} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-red-500 transition-colors">
                        {t('settings.customApi.reset')}
                    </button>
                    <div className="flex gap-4">
                         <button onClick={onClose} className="btn-secondary font-bold py-2 px-6 rounded-lg">
                            {t('cropper.cancel')}
                        </button>
                        <button onClick={handleSave} className="btn-primary font-bold py-2 px-6 rounded-lg">
                            {t('settings.customApi.save')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};