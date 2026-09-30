import { Check } from 'lucide-react';
import type { Perk } from '../data/heroPerks';

interface PerkCardProps {
  perk: Perk;
  /** 같은 등급에서 선호율이 더 높은 특전이면 강조 */
  preferred: boolean;
  accentClass: string;
}

export function PerkCard({ perk, preferred, accentClass }: PerkCardProps) {
  const rate = typeof perk.preferRate === 'number' ? Math.round(perk.preferRate) : null;

  return (
    <div
      className={`flex h-full flex-col gap-3 rounded-xl border p-4 transition-colors ${
        preferred ? 'border-primary/60 bg-primary/5' : 'border-outline-variant bg-surface-container-high/40'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* 아이콘이 아직 공개되지 않은 영웅은 빈 src로 현재 페이지를 다시 요청하지 않도록 자리만 남긴다. */}
        {perk.icon ? (
          <img
            src={perk.icon}
            alt=""
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-lg bg-surface-container object-contain p-1"
          />
        ) : (
          <div className="h-11 w-11 shrink-0 rounded-lg bg-surface-container" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-headline-md text-on-surface">{perk.name}</p>
            {preferred && (
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-surface-container-lowest">
                <Check className="h-2.5 w-2.5" />
                선호
              </span>
            )}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{perk.description}</p>
        </div>
      </div>

      <div className="mt-auto space-y-1">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <span>커뮤니티 선호율</span>
          <span className={preferred ? 'text-primary' : 'text-on-surface'}>{rate === null ? '집계 없음' : `${rate}%`}</span>
        </div>
        {rate !== null && (
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-surface-container-low">
            <div
              className={`h-full rounded-full ${preferred ? 'bg-primary' : accentClass}`}
              style={{ width: `${Math.min(100, Math.max(0, rate))}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
