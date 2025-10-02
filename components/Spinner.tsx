

import React from 'react';

interface SpinnerProps {
  large?: boolean;
  colorClass?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ large = false, colorClass = 'border-white' }) => {
  const sizeClasses = large ? 'h-10 w-10' : 'h-5 w-5';
  const borderClasses = large ? 'border-4' : 'border-2';

  return (
    <div
      className={`${sizeClasses} ${borderClasses} border-t-transparent border-solid animate-spin rounded-full ${colorClass}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};