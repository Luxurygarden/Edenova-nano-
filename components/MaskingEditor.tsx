import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useI18n } from '../i18n/i18n';

interface MaskingEditorProps {
  src: string;
  onConfirm: (maskDataUrl: string) => void;
  onCancel: () => void;
}

export const MaskingEditor: React.FC<MaskingEditorProps> = ({ src, onConfirm, onCancel }) => {
  const { t } = useI18n();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(40);

  const getCanvasContext = useCallback(() => canvasRef.current?.getContext('2d'), []);

  const clearCanvas = useCallback(() => {
    const ctx = getCanvasContext();
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [getCanvasContext]);

  const draw = useCallback((e: PointerEvent) => {
    if (!isDrawing) return;
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }, [isDrawing, brushSize, getCanvasContext]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDrawing(true);
    draw(e.nativeEvent);
  }, [draw]);
  
  const handlePointerUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    draw(e.nativeEvent);
  }, [draw]);
  
  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const handleImageLoad = () => {
      if (image && canvas && container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imgAspectRatio = image.naturalWidth / image.naturalHeight;
        
        let canvasWidth = containerWidth;
        let canvasHeight = containerWidth / imgAspectRatio;
        
        if (canvasHeight > containerHeight) {
            canvasHeight = containerHeight;
            canvasWidth = containerHeight * imgAspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const ctx = getCanvasContext();
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    };

    if (image) {
      image.addEventListener('load', handleImageLoad);
      if (image.complete) {
        handleImageLoad();
      }
    }
    
    return () => {
      image?.removeEventListener('load', handleImageLoad);
    };
  }, [src, getCanvasContext]);

  const handleConfirm = () => {
    const finalCanvas = document.createElement('canvas');
    const image = imageRef.current;
    if (image) {
      finalCanvas.width = image.naturalWidth;
      finalCanvas.height = image.naturalHeight;
      const tempCtx = finalCanvas.getContext('2d');
      if (tempCtx && canvasRef.current) {
        tempCtx.drawImage(canvasRef.current, 0, 0, image.naturalWidth, image.naturalHeight);
        onConfirm(finalCanvas.toDataURL('image/png'));
      }
    }
  };


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="glass-card rounded-xl shadow-2xl p-6 w-full max-w-4xl flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center text-[var(--text-primary)]">{t('masking.title')}</h2>
        
        <div ref={containerRef} className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden select-none">
          <img
            ref={imageRef}
            src={src}
            alt="Masking target"
            className="max-w-full max-h-full object-contain pointer-events-none"
            crossOrigin="anonymous"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-crosshair opacity-50 bg-fuchsia-500/20"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-3 text-[var(--text-primary)]">
                <label htmlFor="brushSize">{t('masking.brushSize')}:</label>
                <input
                    id="brushSize"
                    type="range"
                    min="10"
                    max="150"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-32"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={clearCanvas}
                    className="bg-gray-500/50 hover:bg-gray-500/80 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('masking.clear')}
                </button>
            </div>
        </div>
         <div className="flex justify-end gap-4 mt-2 border-t border-[var(--card-border)] pt-4">
          <button
            onClick={onCancel}
            className="bg-gray-500/50 hover:bg-gray-500/80 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('cropper.cancel')}
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('masking.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};
