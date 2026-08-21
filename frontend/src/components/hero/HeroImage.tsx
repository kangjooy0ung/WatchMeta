import { useDeferredImageLoad } from './useDeferredImageLoad';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroImage({ src, alt, className = 'h-full w-full object-cover' }: HeroImageProps) {
  const { containerRef, shouldRenderImage, handleLoad, handleError } = useDeferredImageLoad(src);

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldRenderImage ? (
        <img src={src} alt={alt} className={className} onLoad={handleLoad} onError={handleError} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-dim">
          <span className="font-headline-md italic text-on-surface">{alt.slice(0, 1)}</span>
        </div>
      )}
    </div>
  );
}
