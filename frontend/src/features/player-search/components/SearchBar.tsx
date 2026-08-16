import { Search } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchHistoryStore } from '../../../store/useSearchHistoryStore';
import type { PlayerSearchResult } from '../../../types/player';
import { searchPlayersByName } from '../api/searchApi';

interface SearchBarProps {
  onSearch: (playerId: string, label: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlayerSearchResult[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addSearch = useSearchHistoryStore((state) => state.addSearch);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsSearching(true);
    setErrorMessage(null);
    try {
      // 배틀태그의 '#태그' 부분은 더 이상 검색에 쓸 수 없어, 닉네임만 잘라서 검색한다.
      const namePart = trimmed.split('#')[0];
      const found = await searchPlayersByName(namePart);
      setResults(found);
      if (found.length === 0) {
        setErrorMessage('일치하는 플레이어를 찾지 못했어요. 닉네임 철자를 확인해 보세요.');
      }
    } catch {
      setErrorMessage('검색 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.');
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePick = (result: PlayerSearchResult) => {
    addSearch({ playerId: result.playerId, label: result.name });
    setResults(null);
    setQuery('');
    onSearch(result.playerId, result.name);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <label className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-4 py-3 transition-colors focus-within:border-primary">
          <Search className="h-5 w-5 shrink-0 text-on-surface-variant" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="닉네임으로 검색 (예: Player)"
            className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
          />
        </label>
        <button
          type="submit"
          disabled={isSearching}
          className="mt-3 w-full -skew-x-[10deg] bg-primary py-3 text-sm font-bold text-surface-container-lowest transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(255,194,127,0.5)] disabled:opacity-60"
        >
          <span className="block skew-x-[10deg]">{isSearching ? '검색 중...' : '전적 검색'}</span>
        </button>
      </form>

      {errorMessage && <p className="mt-3 text-left text-xs text-on-surface-variant">{errorMessage}</p>}

      {results && results.length > 0 && (
        <div className="mt-3 w-full">
          <p className="mb-2 text-left text-xs font-semibold text-on-surface-variant">
            동명이인이 있을 수 있어요. 본인 계정을 선택해 주세요.
          </p>
          <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {results.map((result) => (
              <li key={result.playerId}>
                <button
                  type="button"
                  onClick={() => handlePick(result)}
                  className="flex w-full items-center gap-3 rounded-xl border border-outline-variant bg-surface-container px-3 py-2.5 text-left transition-colors hover:border-primary"
                >
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface-dim">
                    {result.avatarUrl && (
                      <img src={result.avatarUrl} alt={result.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-on-surface">{result.name}</p>
                    {result.title && <p className="truncate text-xs text-on-surface-variant">{result.title}</p>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
