// FIX: This file was a placeholder and has been implemented to provide theme toggling functionality.
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../i18n/i18n';
import { Tooltip } from './Tooltip';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <Tooltip text={t('tooltip.theme.toggle')}>
      <button
        onClick={toggleTheme}
        className="h-8 w-8 bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] rounded-full flex items-center justify-center cursor-pointer transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>
    </Tooltip>
  );
};