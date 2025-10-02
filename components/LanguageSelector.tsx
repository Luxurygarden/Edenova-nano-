// FIX: This file was a placeholder and has been implemented to provide language selection functionality.
import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18n';
import { Tooltip } from './Tooltip';

const LANGUAGES: { code: 'en' | 'pl' | 'de'; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
  { code: 'de', name: 'Deutsch' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'pl' | 'de') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip text={t('tooltip.language', { language: currentLang?.name || '' })}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] rounded-full flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Select language"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-primary)]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527-1.917.941.941 0 011.058.463 6.002 6.002 0 01-1.348 6.454c-.341.341-.742.635-1.155.868a1.5 1.5 0 01-1.473-2.423V11.5a1.5 1.5 0 00-3 0v.423a1.5 1.5 0 01-1.473 2.423c-.413-.233-.814-.527-1.155-.868A6.003 6.003 0 014.332 8.027z" clipRule="evenodd" />
          </svg>
        </button>
      </Tooltip>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[var(--card-bg)] backdrop-blur-md rounded-lg shadow-2xl z-20 border border-[var(--card-border)]">
          <ul className="p-1">
            {LANGUAGES.map(({ code, name }) => (
              <li key={code}>
                <button
                  onClick={() => handleLanguageChange(code)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                    language === code
                      ? 'bg-[var(--accent-primary)]/20 text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--text-primary)]'
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};