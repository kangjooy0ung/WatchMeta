import { useDeferredImageLoad } from './useDeferredImageLoad';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroImage({ src, alt, className = 'h-full w-full object-cover' }: HeroImageProps) {
  const { containerRef, shouldRenderImage, isLoaded, handleLoad, handleError } = useDeferredImageLoad(src);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-dim">
          <span className="font-headline-md italic text-on-surface">{alt.slice(0, 1)}</span>
        </div>
      )}
      {shouldRenderImage && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
