import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18n';
import { useAuth } from '../contexts/AuthContext';
import { Tooltip } from './Tooltip';

interface UserMenuProps {
    onSettingsClick: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onSettingsClick }) => {
  const { t } = useI18n();
  const { user, login, logout, upgrade } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const planText = user?.plan === 'PRO' ? t('auth.plan.pro') : t('auth.plan.free');
  
  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip text={t('tooltip.profile')}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-9 w-9 bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] rounded-full flex items-center justify-center cursor-pointer transition-colors"
        >
          {user ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-primary)]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </Tooltip>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[var(--card-bg)] backdrop-blur-md rounded-lg shadow-2xl z-20 border border-[var(--card-border)] p-2">
          {user ? (
            <div className="flex flex-col">
              <div className="p-2 flex items-center gap-3 border-b border-[var(--card-border)] mb-2">
                <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-grow">
                    <p className="font-semibold text-sm text-[var(--text-primary)]">{user.name}</p>
                    <p className={`text-xs font-bold ${user.plan === 'PRO' ? 'text-amber-500' : 'text-[var(--text-secondary)]'}`}>{planText}</p>
                </div>
              </div>
              {user.plan === 'FREE' && (
                <button onClick={() => { upgrade(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--text-primary)] flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                   {t('auth.upgrade')}
                </button>
              )}
               <button onClick={() => { onSettingsClick(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--text-primary)] flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 {t('settings.title')}
              </button>
              <button onClick={logout} className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--text-primary)] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                {t('auth.logout')}
              </button>
            </div>
          ) : (
            <button onClick={login} className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--text-primary)]">
              {t('auth.login')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};