import React, { useRef } from 'react';
import { useI18n } from '../i18n/i18n';
import { Tooltip } from './Tooltip';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreviewUrl: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreviewUrl, onClear }) => {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
     // Reset the input value to allow uploading the same file again
    if(event.target) {
        event.target.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const hasImage = imagePreviewUrl !== null;

  return (
    <div className={`relative ${hasImage ? 'w-full max-w-xs md:w-32 md:flex-shrink-0' : 'w-full'}`}>
      <label
        id="image-upload-label"
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`relative flex justify-center items-center bg-[var(--control-bg)] border border-transparent rounded-lg cursor-pointer hover:border-[var(--accent-primary)] transition-colors duration-300 group
          ${hasImage ? 'aspect-square w-full md:w-32 md:h-32 md:aspect-auto' : 'w-full h-48'}`}
      >
        {imagePreviewUrl ? (
          <>
            <img src={imagePreviewUrl} alt="Uploaded preview" className="object-cover h-full w-full rounded-md" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                 <Tooltip text={t('tooltip.clearImage')} position="top">
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); // Prevent label click from opening file dialog
                            e.stopPropagation();
                            onClear();
                        }} 
                        className="h-10 w-10 bg-red-600/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all"
                        aria-label={t('uploader.clear')}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </Tooltip>
            </div>
          </>
        ) : (
          <div className="text-center text-[var(--text-secondary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 font-semibold">{t('uploader.dropzone.main')}</p>
            <p className="text-xs">{t('uploader.dropzone.sub')}</p>
          </div>
        )}
        <input
          id="image-upload"
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};