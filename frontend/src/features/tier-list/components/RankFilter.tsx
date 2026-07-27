const RANKS = ['전체', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터', '그랜드마스터'];

interface RankFilterProps {
  rank: string;
  onChange: (rank: string) => void;
}

export function RankFilter({ rank, onChange }: RankFilterProps) {
  return (
    <select value={rank} onChange={(e) => onChange(e.target.value)}>
      {RANKS.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
}
