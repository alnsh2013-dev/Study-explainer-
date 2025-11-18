
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../lib/localization';
import { THEMES } from '../constants';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  const t = translations[context.language];
  const currentTheme = THEMES[context.theme];

  return { ...context, t, currentTheme };
};
