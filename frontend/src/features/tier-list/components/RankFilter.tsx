import { ChevronDown } from 'lucide-react';

const RANKS = ['전체', '브론즈', '실버', '골드', '플래티넘', '에메랄드', '다이아몬드', '마스터', '그랜드마스터 및 챔피언'];

interface RankFilterProps {
  rank: string;
  onChange: (rank: string) => void;
}

export function RankFilter({ rank, onChange }: RankFilterProps) {
  return (
    <div className="relative flex flex-1 cursor-pointer flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors hover:border-primary">
      <span className="text-label-sm font-label-sm text-on-surface-variant">랭크</span>
      <div className="flex items-center gap-1">
        <span className="w-full truncate font-bold text-on-surface">{rank}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant" />
      </div>
      <select
        aria-label="랭크"
        value={rank}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {RANKS.map((r) => (
          <option key={r} value={r} className="bg-surface-container text-on-surface">
            {r}
          </option>
        ))}
      </select>
    </div>
  );
}
