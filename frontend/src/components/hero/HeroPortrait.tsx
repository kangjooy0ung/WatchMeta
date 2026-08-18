import { useEffect, useRef, useState } from 'react';
import { ROLE_RING_COLOR } from '../../constants/roles';
import type { HeroRole } from '../../types/hero';

interface HeroPortraitProps {
  name: string;
  role: HeroRole;
  portraitUrl?: string;
  className?: string;
}

// 외부 CDN 요청이 load/error 어느 이벤트도 못 낸 채 무기한 pending 상태로 멈추는 경우가 있어,
// 일정 시간 안에 응답이 없으면 실패로 간주하고 이니셜 대체 표시로 넘어간다.
const LOAD_TIMEOUT_MS = 6000;

export function HeroPortrait({ name, role, portraitUrl, className = 'h-8 w-8' }: HeroPortraitProps) {
  const [failed, setFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setFailed(false);
    if (!portraitUrl) return undefined;
    timeoutRef.current = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [portraitUrl]);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-surface-dim ${ROLE_RING_COLOR[role]} ${className}`}
    >
      {portraitUrl && !failed ? (
        <img
          src={portraitUrl}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          onLoad={() => clearTimeout(timeoutRef.current)}
          onError={() => {
            clearTimeout(timeoutRef.current);
            setFailed(true);
          }}
        />
      ) : (
        <span className="font-headline-md italic text-on-surface">{name.slice(0, 1)}</span>
      )}
    </div>
  );
}
