import React, { useState, useLayoutEffect, useRef } from 'react';
import { useI18n } from '../i18n/i18n';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps = [
  {
    selector: '#image-upload-label',
    titleKey: 'tour.step1.title',
    contentKey: 'tour.step1.content',
  },
  {
    selector: '#prompt-textarea',
    titleKey: 'tour.step2.title',
    contentKey: 'tour.step2.content',
  },
  {
    selector: '#generate-button',
    titleKey: 'tour.step3.title',
    contentKey: 'tour.step3.content',
  },
  {
    selector: '#result-panel',
    titleKey: 'tour.step4.title',
    contentKey: 'tour.step4.content',
  },
];

const POPOVER_MARGIN = 16;

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen) {
      setIsPopoverVisible(false);
      return;
    };
    
    const calculatePosition = () => {
        const step = tourSteps[currentStep];
        const element = document.querySelector(step.selector);
        const popover = popoverRef.current;

        if (element && popover) {
          const rect = element.getBoundingClientRect();
          setTargetRect(rect);
          
          const popoverHeight = popover.offsetHeight;
          let top = rect.bottom + POPOVER_MARGIN;
          const left = rect.left + rect.width / 2;
          
          // Check if it fits below, using the actual popover height
          if (top + popoverHeight > window.innerHeight) { 
             top = rect.top - POPOVER_MARGIN;
             setPopoverStyle({
                 top: `${top}px`,
                 left: `${left}px`,
                 transform: 'translateX(-50%) translateY(-100%)',
             });
          } else {
            setPopoverStyle({
                top: `${top}px`,
                left: `${left}px`,
                transform: 'translateX(-50%)',
            });
          }
          setTimeout(() => setIsPopoverVisible(true), 100); // fade in after positioning
          
        } else {
            // if element not found, maybe move to next step or end tour
            if (currentStep < tourSteps.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                onClose();
            }
        }
    }
    
    // Hide popover before recalculating
    setIsPopoverVisible(false);
    // Recalculate position after a short delay to allow UI to update
    const timer = setTimeout(calculatePosition, 50);

    window.addEventListener('resize', calculatePosition);

    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculatePosition);
    };

  }, [currentStep, isOpen, onClose]);
  
  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const currentStepConfig = tourSteps[currentStep];

  return (
    <div className="tour-spotlight">
      {targetRect && (
          <div
            className="tour-highlight"
            style={{
              width: `${targetRect.width}px`,
              height: `${targetRect.height}px`,
              top: `${targetRect.top}px`,
              left: `${targetRect.left}px`,
            }}
          />
      )}

      <div ref={popoverRef} className={`tour-popover glass-card ${isPopoverVisible ? 'visible' : ''}`} style={popoverStyle}>
        <div className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)] text-glow">{t(currentStepConfig.titleKey as any)}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{t(currentStepConfig.contentKey as any)}</p>

            <div className="flex justify-between items-center mt-4">
                <button onClick={onClose} className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('tour.skip')}
                </button>
                <div className="flex items-center gap-2">
                    {currentStep > 0 && (
                        <button onClick={handlePrev} className="text-sm font-bold py-2 px-4 rounded-lg bg-[var(--control-bg)] hover:bg-[var(--control-bg-hover)] text-[var(--text-primary)] transition-colors">
                            {t('tour.prev')}
                        </button>
                    )}
                    <button onClick={handleNext} className="text-sm font-bold py-2 px-4 rounded-lg btn-primary">
                        {currentStep === tourSteps.length - 1 ? t('tour.finish') : t('tour.next')}
                    </button>
                </div>
            </div>
             <div className="flex justify-center gap-2 mt-2">
                {tourSteps.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep ? 'bg-[var(--accent-primary)]' : 'bg-[var(--control-bg)]'
                        }`}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};