export type MapSortOption = 'recommended' | 'winRate' | 'pickRate';

const OPTIONS: Array<{ id: MapSortOption; label: string }> = [
  { id: 'recommended', label: '종합 추천' },
  { id: 'winRate', label: '승률' },
  { id: 'pickRate', label: '픽률' },
];

interface MapSortControlProps {
  sort: MapSortOption;
  onChange: (sort: MapSortOption) => void;
}

export function MapSortControl({ sort, onChange }: MapSortControlProps) {
  return (
    <div role="group" aria-label="정렬 기준" className="flex rounded-xl border border-outline-variant bg-surface-container-high p-1">
      {OPTIONS.map(({ id, label }) => {
        const isActive = sort === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all active:scale-95 ${
              isActive ? 'bg-primary text-surface-container-lowest' : 'text-on-surface-variant hover:bg-surface-variant/40'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
