import { useEffect, useRef, useState } from 'react';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

// 외부 CDN 요청이 load/error 어느 이벤트도 못 낸 채 무기한 pending 상태로 멈추는 경우가 있어,
// 일정 시간 안에 응답이 없으면 실패로 간주하고 이니셜 대체 표시로 넘어간다.
const LOAD_TIMEOUT_MS = 6000;

export function HeroImage({ src, alt, className = 'h-full w-full object-cover' }: HeroImageProps) {
  const [failed, setFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setFailed(false);
    timeoutRef.current = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [src]);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface-dim">
        <span className="font-headline-md italic text-on-surface">{alt.slice(0, 1)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={() => clearTimeout(timeoutRef.current)}
      onError={() => {
        clearTimeout(timeoutRef.current);
        setFailed(true);
      }}
    />
  );
}
