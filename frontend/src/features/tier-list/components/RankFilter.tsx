import { ChevronDown } from 'lucide-react';

const RANKS = ['전체', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터', '그랜드마스터'];

interface RankFilterProps {
  rank: string;
  onChange: (rank: string) => void;
}

export function RankFilter({ rank, onChange }: RankFilterProps) {
  return (
    <div className="relative flex-1">
      <select
        value={rank}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {RANKS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
