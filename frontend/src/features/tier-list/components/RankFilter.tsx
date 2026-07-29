import { ChevronDown } from 'lucide-react';

const RANKS = ['전체', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터', '그랜드마스터'];

interface RankFilterProps {
  rank: string;
  onChange: (rank: string) => void;
}

export function RankFilter({ rank, onChange }: RankFilterProps) {
  return (
    <label className="flex flex-1 cursor-pointer flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors hover:border-primary">
      <span className="text-label-sm font-label-sm text-on-surface-variant">랭크</span>
      <div className="flex items-center gap-1">
        <select
          value={rank}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent font-bold text-on-surface focus:outline-none"
        >
          {RANKS.map((r) => (
            <option key={r} value={r} className="bg-surface-container text-on-surface">
              {r}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant" />
      </div>
    </label>
  );
}
