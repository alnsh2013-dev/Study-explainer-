
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { icons, THEMES } from '../constants';
import type { AppView, Language, Theme } from '../types';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { language, setLanguage, theme, setTheme, t, currentTheme } = useAppContext();

  const navItems: { view: AppView; icon: React.ElementType; label: string }[] = [
    { view: 'chat', icon: icons.tutor, label: t.sidebar.smartTutor },
    { view: 'mindmap', icon: icons.mindmap, label: t.sidebar.mindMaps },
    { view: 'whiteboard', icon: icons.whiteboard, label: t.sidebar.whiteboard },
    { view: 'tables', icon: icons.table, label: t.sidebar.tables },
    { view: 'tools', icon: icons.tools, label: t.sidebar.studyTools },
  ];

  return (
    <aside className={`${currentTheme.secondary} ${currentTheme.text} w-64 p-4 flex flex-col space-y-4 transition-colors duration-300`}>
      <h1 className={`text-2xl font-bold text-center ${currentTheme.textSecondary === 'text-slate-400' ? 'text-white' : currentTheme.textSecondary}`}>{t.title}</h1>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.view}>
              <button
                onClick={() => setActiveView(item.view)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 ${
                  activeView === item.view
                    ? `${currentTheme.accent} text-white font-semibold shadow-md`
                    : `hover:${currentTheme.primary} hover:bg-opacity-50`
                }`}
              >
                <item.icon className="w-6 h-6 me-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4">
        <div>
          <label htmlFor="language-select" className={`block text-sm font-medium ${currentTheme.textSecondary} mb-1`}>
            {t.settings.language}
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className={`w-full p-2 rounded-md ${currentTheme.card} ${currentTheme.text} ${currentTheme.border} border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors`}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="da">Dansk</option>
          </select>
        </div>
        <div>
          <label htmlFor="theme-select" className={`block text-sm font-medium ${currentTheme.textSecondary} mb-1`}>
            {t.settings.theme}
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className={`w-full p-2 rounded-md ${currentTheme.card} ${currentTheme.text} ${currentTheme.border} border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors`}
          >
            {Object.keys(THEMES).map((themeKey) => (
                <option key={themeKey} value={themeKey}>
                    {t.settings.themes[themeKey]}
                </option>
            ))}
          </select>
        </div>
      </div>

      <footer className={`text-xs text-center ${currentTheme.textSecondary} mt-4`}>
        {t.copyright}
      </footer>
    </aside>
  );
};

export default Sidebar;