import { X } from 'lucide-react';
import { useSearchHistoryStore } from '../../../store/useSearchHistoryStore';

interface RecentSearchListProps {
  onSelect: (battleTag: string) => void;
}

export function RecentSearchList({ onSelect }: RecentSearchListProps) {
  const recentSearches = useSearchHistoryStore((state) => state.recentSearches);
  const removeSearch = useSearchHistoryStore((state) => state.removeSearch);

  if (recentSearches.length === 0) return null;

  return (
    <div className="mt-6 w-full">
      <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">최근 검색</p>
      <ul className="flex flex-col gap-2">
        {recentSearches.map((battleTag) => (
          <li
            key={battleTag}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <button
              type="button"
              onClick={() => onSelect(battleTag)}
              className="flex-1 truncate text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              {battleTag}
            </button>
            <button
              type="button"
              onClick={() => removeSearch(battleTag)}
              aria-label={`${battleTag} 삭제`}
              className="ml-2 shrink-0 rounded-full p-1 text-gray-300 transition-colors hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
