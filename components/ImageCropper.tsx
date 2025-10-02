import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useI18n } from '../i18n/i18n';

interface ImageCropperProps {
  src: string;
  aspectRatio: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ src, aspectRatio, onCropComplete, onCancel }) => {
  const { t } = useI18n();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 }); // in %
  const [isDragging, setIsDragging] = useState(false);

  const getAspectRatio = useCallback(() => {
    const [w, h] = aspectRatio.split(':').map(Number);
    return w / h;
  }, [aspectRatio]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImage(e.currentTarget);
  };
  
  const handleConfirmCrop = () => {
    if (!image || !canvasRef.current || !containerRef.current) return;

    const scaleX = image.naturalWidth / containerRef.current.offsetWidth;
    const scaleY = image.naturalHeight / containerRef.current.offsetHeight;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const cropX = (crop.x / 100) * containerRef.current.offsetWidth * scaleX;
    const cropY = (crop.y / 100) * containerRef.current.offsetHeight * scaleY;
    const cropWidth = (crop.width / 100) * containerRef.current.offsetWidth * scaleX;
    const cropHeight = (crop.height / 100) * containerRef.current.offsetHeight * scaleY;
    
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    onCropComplete(canvas.toDataURL('image/png'));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const dx = (e.movementX / containerRect.width) * 100;
      const dy = (e.movementY / containerRect.height) * 100;
      
      setCrop(prev => {
          let newX = prev.x + dx;
          let newY = prev.y + dy;
          
          newX = Math.max(0, Math.min(newX, 100 - prev.width));
          newY = Math.max(0, Math.min(newY, 100 - prev.height));
          
          return { ...prev, x: newX, y: newY };
      });

  }, [isDragging]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  useEffect(() => {
      if(!containerRef.current || !image) return;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const ratio = getAspectRatio();
      
      let newWidth, newHeight;
      if(containerWidth / containerHeight > ratio) { // container is wider than crop
          newHeight = 90; // %
          newWidth = (newHeight * containerHeight / containerWidth) * ratio;
      } else { // container is taller than crop
          newWidth = 90; // %
          newHeight = (newWidth * containerWidth / containerHeight) / ratio;
      }
      
      setCrop({
          x: (100 - newWidth) / 2,
          y: (100 - newHeight) / 2,
          width: newWidth,
          height: newHeight
      });
  }, [aspectRatio, image, getAspectRatio]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="glass-card rounded-xl shadow-2xl p-6 w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center text-[var(--text-primary)]">{t('cropper.title')}</h2>
        <div 
            ref={containerRef} 
            className="relative w-full max-h-[60vh] overflow-hidden select-none"
            style={{ userSelect: 'none' }}
        >
          <img
            src={src}
            onLoad={handleImageLoad}
            alt="To be cropped"
            className="w-full h-full object-contain"
          />
          {image && (
            <div
                className="absolute top-0 left-0 cursor-move"
                style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
                    border: '2px dashed rgba(255, 255, 255, 0.9)'
                }}
                onMouseDown={handleMouseDown}
            >
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-2">
          <button
            onClick={onCancel}
            className="bg-gray-500/50 hover:bg-gray-500/80 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('cropper.cancel')}
          </button>
          <button
            onClick={handleConfirmCrop}
            className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('cropper.confirm')}
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};