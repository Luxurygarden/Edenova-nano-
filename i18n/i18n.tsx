import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

import en from './translations/en';
import pl from './translations/pl';
import de from './translations/de';

type Language = 'en' | 'pl' | 'de';
type Translations = typeof en;
// FIX: Export TranslationKey so it can be used in other components.
export type TranslationKey = keyof Translations;

const translations: Record<Language, Translations> = {
  en,
  pl,
  de,
};

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pl');

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string>): string => {
    let translation = translations[language][key] || translations['en'][key] || String(key);
    
    if (replacements && typeof translation === 'string') {
        Object.keys(replacements).forEach((placeholder) => {
            translation = (translation as string).replace(`{${placeholder}}`, replacements[placeholder]);
        });
    }

    return String(translation);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};