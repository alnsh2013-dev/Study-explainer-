
import React, { createContext, useState, useEffect } from 'react';
import type { Language, Theme } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    return savedLang || 'en';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'deep_ocean';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
