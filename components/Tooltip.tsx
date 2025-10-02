import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'bottom' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  };

  return (
    <div className="relative group flex justify-center">
      {children}
      <div
        role="tooltip"
        className={`absolute ${positionClasses[position]} w-max max-w-xs text-left whitespace-pre-line bg-[#3C3C3C]/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg py-1.5 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50 shadow-lg`}
      >
        {text}
      </div>
    </div>
  );
};