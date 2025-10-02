import React from 'react';
import { EditResult } from '../App';
import { useI18n } from '../i18n/i18n';

interface HistoryRailProps {
  history: EditResult[];
  onSelect: (result: EditResult) => void;
  activeResult: EditResult | null;
}

export const HistoryRail: React.FC<HistoryRailProps> = ({ history, onSelect, activeResult }) => {
  const { t } = useI18n();

  if (history.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 pt-4 border-t border-[var(--card-border)] mt-auto flex-shrink-0">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)]">{t('result.historyTitle')}</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] focus:ring-[var(--accent-primary)] ${
              item.image === activeResult?.image ? 'ring-2 ring-[var(--accent-primary)] shadow-lg' : 'ring-1 ring-transparent hover:ring-[var(--accent-primary)]'
            }`}
          >
            {item.image && (
              <img
                src={item.image}
                alt={`History item ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};