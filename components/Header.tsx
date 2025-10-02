import React from 'react';
import { useI18n } from '../i18n/i18n';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggleButton } from './ThemeToggleButton';
import { UserMenu } from './UserMenu';

interface HeaderProps {
    onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { t } = useI18n();

  return (
    <header className="bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--card-border)] sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--accent-primary)] tracking-wider text-glow">
                {t('header.title')}
            </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggleButton />
          <UserMenu onSettingsClick={onSettingsClick} />
        </div>
      </div>
    </header>
  );
};