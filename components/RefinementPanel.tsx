import React, { useState, useEffect } from 'react';
import { useI18n, TranslationKey } from '../i18n/i18n';
import { Tooltip } from './Tooltip';
import { EditResult } from '../App';

type ActiveTool = 'alternatives' | 'gardenStyle' | 'season';

interface RefinementPanelProps {
    currentImage: EditResult;
    onSimpleRefine: (baseImage: EditResult, prompt: string) => void;
    isPremium: boolean;
    onUpgradeClick: () => void;
}

const Chip: React.FC<{ text: string; onClick: () => void; selected?: boolean, disabled?: boolean }> = ({ text, onClick, selected, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`text-xs font-medium py-1 px-2 rounded-full transition-colors whitespace-nowrap ${
            selected
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] text-[var(--text-primary)]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {text}
    </button>
);

const ChipGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-[var(--text-secondary)]">{label}</span>
        {children}
    </div>
);


export const RefinementPanel: React.FC<RefinementPanelProps> = ({ currentImage, onSimpleRefine, isPremium, onUpgradeClick }) => {
    const { t } = useI18n();
    const [activeTool, setActiveTool] = useState<ActiveTool | null>(null);
    const [prompt, setPrompt] = useState('');
    const [upgradeLevel, setUpgradeLevel] = useState(0); 
    const [selections, setSelections] = useState<Record<string, Set<string>>>({});

    const toolConfig: Record<ActiveTool, { icon: React.ReactElement; tooltipKey: TranslationKey; descriptionKey: TranslationKey; buttonKey: TranslationKey }> = {
        alternatives: {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            tooltipKey: 'tooltip.refine.alternatives',
            descriptionKey: 'refine.description.alternatives',
            buttonKey: 'refine.button.suggest'
        },
        gardenStyle: {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            tooltipKey: 'tooltip.refine.gardenStyle',
            descriptionKey: 'refine.description.gardenStyle',
            buttonKey: 'refine.button.applyStyle'
        },
        season: {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            tooltipKey: 'tooltip.refine.season',
            descriptionKey: 'refine.description.season',
            buttonKey: 'refine.button.visualize'
        }
    };

    const handleToolSelect = (tool: ActiveTool) => {
        setActiveTool(prev => {
            if (prev === tool) {
                return null;
            }
            setSelections({});
            setPrompt('');
            return tool;
        });
    };

    const handleChipClick = (category: string, value: string, singleSelect: boolean = false) => {
        setSelections(prev => {
            const newSelections = { ...prev };
            const categorySet = new Set(newSelections[category]);

            if (singleSelect) {
                if (categorySet.has(value)) {
                    categorySet.delete(value);
                } else {
                    categorySet.clear();
                    categorySet.add(value);
                }
            } else {
                if (categorySet.has(value)) {
                    categorySet.delete(value);
                } else {
                    categorySet.add(value);
                }
            }
            
            newSelections[category] = categorySet;
            return newSelections;
        });
    };
    
    useEffect(() => {
        if (!activeTool) return;

        const promptParts: string[] = [];
        
        const processCategory = (category: string, templateKey: TranslationKey, placeholderKey: 'items' | 'changes' = 'items') => {
            const items = Array.from(selections[category] || []);
            if (items.length > 0) {
                const joinedItems = items.join(t('common.and'));
                promptParts.push(t(templateKey, { [placeholderKey]: joinedItems }));
            }
        };
        
        if (activeTool === 'alternatives') {
            processCategory('terrace', 'prompt.refine.terrace');
            processCategory('fence', 'prompt.refine.fence');
            processCategory('plants', 'prompt.refine.plants');
            processCategory('arrangement', 'prompt.refine.arrangement');
        } else if (activeTool === 'gardenStyle') {
            processCategory('gardenStyle', 'prompt.template.gardenStyle', 'changes');
        } else if (activeTool === 'season') {
            const seasonItems = [
                ...Array.from(selections['season'] || []),
                ...Array.from(selections['time'] || []),
                ...Array.from(selections['presets'] || []),
                ...Array.from(selections['other'] || []),
            ];
            if (seasonItems.length > 0) {
                 const joinedItems = seasonItems.join(t('common.and'));
                 promptParts.push(t('prompt.template.season', { 'changes': joinedItems }));
            }
        }
        
        setPrompt(promptParts.join(' '));

    }, [selections, activeTool, t]);

    const handleSubmit = () => {
        if (!prompt) return;
        onSimpleRefine(currentImage, prompt);
        setActiveTool(null);
        setPrompt('');
        setSelections({});
    };

    const handleUpgrade = () => {
        if (!isPremium) {
            onUpgradeClick();
            return;
        }
        const targetState = upgradeLevel === 0 ? 1 : (upgradeLevel === 1 ? 2 : 1);
        const levelsToGenerate: ('premium' | 'luxury')[] = ['premium', 'luxury'];
        const levelKey = `refine.upgrade.level.${levelsToGenerate[targetState - 1]}` as TranslationKey;
        const levelText = t(levelKey);

        const upgradePrompt = t('prompt.template.upgrade', { level: levelText });
        onSimpleRefine(currentImage, upgradePrompt);
        setUpgradeLevel(targetState);
    };

    const upgradeButtonText = t(isPremium && upgradeLevel === 1 ? 'refine.upgrade.level.luxury' : 'refine.upgrade.level.premium');

    const getChip = (category: string, translationKey: string, singleSelect = false) => {
        const text = t(translationKey as TranslationKey);
        return (
            <Chip
                key={translationKey}
                text={text}
                onClick={() => handleChipClick(category, text, singleSelect)}
                selected={selections[category]?.has(text)}
            />
        );
    };


    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-[var(--card-border)]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-sm font-semibold text-center text-[var(--text-secondary)]">{t('refine.title')}</h3>
                <Tooltip text={isPremium ? t('tooltip.refine.upgrade') : t('tooltip.refine.upgrade.pro')} position="top">
                    <button onClick={handleUpgrade} className="relative flex items-center gap-2 text-sm font-semibold bg-amber-400/20 hover:bg-amber-400/40 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-lg transition-colors whitespace-nowrap">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                         {t('refine.upgrade.button')} → {upgradeButtonText}
                         {!isPremium && <span className="absolute -top-2 -right-2 text-xs font-bold text-amber-900 bg-amber-400 px-1.5 py-0.5 rounded-full">PRO</span>}
                    </button>
                </Tooltip>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(toolConfig) as ActiveTool[]).map(tool => (
                    <Tooltip key={tool} text={t(toolConfig[tool].tooltipKey)} position="top">
                        <button
                            onClick={() => handleToolSelect(tool)}
                            className={`w-full py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                                activeTool === tool
                                    ? 'bg-[var(--control-bg-hover)] text-white shadow-md'
                                    : 'bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] text-[var(--text-primary)]'
                            }`}
                        >
                            {toolConfig[tool].icon}
                            {t(`refine.tool.${tool}` as TranslationKey)}
                        </button>
                    </Tooltip>
                ))}
            </div>

            {activeTool === 'alternatives' && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-center text-[var(--text-secondary)]">{t('refine.description.alternatives')}</p>
                    <ChipGroup label={t('refine.chips.terrace.label')}>
                        {['1','2','3','4'].map(i => getChip('terrace', `refine.chips.terrace.chip${i}`))}
                    </ChipGroup>
                    <ChipGroup label={t('refine.chips.fence.label')}>
                        {['1','2','3','4'].map(i => getChip('fence', `refine.chips.fence.chip${i}`))}
                    </ChipGroup>
                    <ChipGroup label={t('refine.chips.plants.label')}>
                        {['1','2','3','4'].map(i => getChip('plants', `refine.chips.plants.chip${i}`))}
                    </ChipGroup>
                    <ChipGroup label={t('refine.chips.arrangement.label')}>
                        {getChip('arrangement', 'refine.chips.arrangement.chip1')}
                    </ChipGroup>
                </div>
            )}

            {activeTool === 'gardenStyle' && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-center text-[var(--text-secondary)]">{t('refine.description.gardenStyle')}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {['1','2','3','4','5','6','7','8','9'].map(i => getChip('gardenStyle', `refine.chips.gardenStyle.chip${i}`, true))}
                    </div>
                     <ChipGroup label={t('refine.chips.gardenStyle.options.label')}>
                        {getChip('gardenStyleOptions', 'refine.chips.gardenStyle.option1')}
                        {getChip('gardenStyleOptions', 'refine.chips.gardenStyle.option2')}
                    </ChipGroup>
                </div>
            )}
            
            {activeTool === 'season' && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-center text-[var(--text-secondary)]">{t('refine.description.season')}</p>
                    <ChipGroup label={t('refine.chips.season.season.label')}>
                        {['1','2','3','4'].map(i => getChip('season', `refine.chips.season.season.chip${i}`, true))}
                    </ChipGroup>
                     <ChipGroup label={t('refine.chips.season.time.label')}>
                        {['1','2','3','4'].map(i => getChip('time', `refine.chips.season.time.chip${i}`, true))}
                    </ChipGroup>
                    <ChipGroup label={t('refine.chips.season.presets.label')}>
                        {['1','2','3','4'].map(i => getChip('presets', `refine.chips.season.presets.chip${i}`))}
                    </ChipGroup>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                        {getChip('other', 'refine.chips.season.other.chip1')}
                        {getChip('other', 'refine.chips.season.other.chip2')}
                    </div>
                </div>
            )}

            {activeTool && (
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t('prompt.placeholder')}
                        rows={2}
                        className="flex-grow p-2 bg-[var(--control-bg)] border border-transparent rounded-lg text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--accent-primary-hover)] focus:border-transparent transition-all duration-200 placeholder-[var(--text-secondary)]"
                    />
                     <button
                        onClick={handleSubmit}
                        disabled={!prompt}
                        className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t(toolConfig[activeTool].buttonKey)}
                    </button>
                </div>
            )}
        </div>
    );
};