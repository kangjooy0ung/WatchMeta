import { X } from 'lucide-react';
import { useSearchHistoryStore } from '../../../store/useSearchHistoryStore';

interface RecentSearchListProps {
  onSelect: (playerId: string, label: string) => void;
}

export function RecentSearchList({ onSelect }: RecentSearchListProps) {
  const recentSearches = useSearchHistoryStore((state) => state.recentSearches);
  const removeSearch = useSearchHistoryStore((state) => state.removeSearch);

  if (recentSearches.length === 0) return null;

  return (
    <div className="mt-6 w-full">
      <p className="mb-2 text-left text-xs font-semibold text-on-surface-variant">최근 검색</p>
      <ul className="flex flex-col gap-2">
        {recentSearches.map((entry) => (
          <li
            key={entry.playerId}
            className="flex items-center justify-between rounded-xl border border-outline-variant bg-surface-container px-4 py-2.5"
          >
            <button
              type="button"
              onClick={() => onSelect(entry.playerId, entry.label)}
              className="flex-1 truncate text-left text-sm font-medium text-on-surface"
            >
              {entry.label}
            </button>
            <button
              type="button"
              onClick={() => removeSearch(entry.playerId)}
              aria-label={`${entry.label} 삭제`}
              className="ml-2 shrink-0 rounded-full p-1 text-on-surface-variant/50 transition-colors hover:text-on-surface-variant"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
