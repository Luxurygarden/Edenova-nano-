import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

interface ApiSettings {
  url: string;
  key: string;
}

interface SettingsContextType {
  settings: ApiSettings;
  saveSettings: (newSettings: ApiSettings) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: ApiSettings = {
    url: '',
    key: ''
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ApiSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
        const storedSettings = localStorage.getItem('apiSettings');
        if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
        }
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
    }
  }, []);

  const saveSettings = useCallback((newSettings: ApiSettings) => {
    localStorage.setItem('apiSettings', JSON.stringify(newSettings));
    setSettings(newSettings);
  }, []);

  const resetSettings = useCallback(() => {
    localStorage.removeItem('apiSettings');
    setSettings(DEFAULT_SETTINGS);
  }, []);


  return (
    <SettingsContext.Provider value={{ settings, saveSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};