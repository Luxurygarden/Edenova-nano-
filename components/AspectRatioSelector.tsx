import React from 'react';
import { useI18n } from '../i18n/i18n';
import { Tooltip } from './Tooltip';

interface AspectRatioSelectorProps {
  selectedRatio: string;
  onRatioChange: (ratio: string) => void;
}

const RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onRatioChange }) => {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-5 gap-2">
      {RATIOS.map((ratio) => (
        <Tooltip key={ratio} text={t('tooltip.aspectRatio', { ratio })} position="top">
          <button
            onClick={() => onRatioChange(ratio)}
            className={`w-full py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              selectedRatio === ratio
                ? 'bg-[var(--control-bg-hover)] text-white shadow-md'
                : 'bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] text-[var(--text-primary)]'
            }`}
          >
            {ratio}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};