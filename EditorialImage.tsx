import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackTitle?: string;
  surface?: 'dark' | 'light';
  loading?: 'eager' | 'lazy';
}

export function EditorialImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden',
  fallbackTitle,
  surface = 'light',
  loading = 'lazy',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  const fallbackColors =
    surface === 'dark'
      ? 'bg-[#141414] text-[#F4F3EF] border border-white/15'
      : 'bg-[#E9E7E1] text-[#0B0B0B] border border-[#0B0B0B]/15';

  const mutedText = surface === 'dark' ? 'text-[#8A8985]' : 'text-[#5B5A56]';

  if (hasError || !src) {
    return (
      <div
        className={`${containerClassName} ${fallbackColors} flex flex-col items-center justify-center p-6 text-center`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className={`w-6 h-6 mb-3 ${mutedText}`} aria-hidden="true" />
        <p className="font-display text-sm font-medium tracking-tight">
          {fallbackTitle || 'Image unavailable'}
        </p>
        <p className={`mt-1 text-xs max-w-[28ch] ${mutedText}`}>
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
