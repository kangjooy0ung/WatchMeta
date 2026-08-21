import { isAxiosError } from 'axios';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchHistoryStore } from '../../../store/useSearchHistoryStore';
import type { PlayerSearchResult } from '../../../types/player';
import { searchPlayersByName } from '../api/searchApi';

interface SearchBarProps {
  onSearch: (playerId: string, label: string) => void;
}

// 배틀태그 번호·플랫폼·지역 같은 식별 정보를 검색 API가 제공하지 않아, 동명이인을 구분할 최소한의
// 단서로 "최근 활동 시각"만이라도 상대적 표현으로 보여준다.
function formatRelativeActivity(unixSeconds: number | null): string | null {
  if (!unixSeconds) return null;
  const diffMs = Date.now() - unixSeconds * 1000;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return '오늘 활동';
  if (diffDays === 1) return '어제 활동';
  if (diffDays < 30) return `${diffDays}일 전 활동`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}개월 전 활동`;
  return '1년 이상 전 활동';
}

function describeSearchError(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return '네트워크 연결을 확인하고 다시 시도해 주세요.';
    }
    if (error.response.status === 502) {
      return '오버워치 서버 응답이 지연되고 있어요. 잠시 후 다시 시도해 주세요.';
    }
    if (typeof error.response.data?.message === 'string') {
      return error.response.data.message;
    }
  }
  return '검색 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.';
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlayerSearchResult[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const lastQueryRef = useRef('');
  const addSearch = useSearchHistoryStore((state) => state.addSearch);

  useEffect(() => {
    if (!isSearching) return;
    setElapsedSeconds(0);
    const timer = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isSearching]);

  const runSearch = async (namePart: string) => {
    setIsSearching(true);
    setErrorMessage(null);
    setCanRetry(false);
    try {
      const found = await searchPlayersByName(namePart);
      setResults(found);
      if (found.length === 0) {
        setErrorMessage('일치하는 플레이어를 찾지 못했어요. 닉네임 철자를 확인해 보세요.');
      }
    } catch (error) {
      setErrorMessage(describeSearchError(error));
      setCanRetry(true);
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setErrorMessage('검색어를 입력해 주세요.');
      return;
    }

    // 배틀태그의 '#태그' 부분은 더 이상 검색에 쓸 수 없어, 닉네임만 잘라서 검색한다.
    const namePart = trimmed.split('#')[0];
    lastQueryRef.current = namePart;
    await runSearch(namePart);
  };

  const handleRetry = () => {
    if (!lastQueryRef.current) return;
    void runSearch(lastQueryRef.current);
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
        <p className="mt-1.5 pl-2 text-xs text-on-surface-variant/70">
          닉네임#1234처럼 배틀태그를 입력해도 괜찮습니다. &apos;#&apos; 뒤 숫자는 검색에 쓰지 않으니 닉네임만 입력해도 됩니다.
        </p>
        <button
          type="submit"
          disabled={isSearching}
          className="mt-3 w-full -skew-x-[10deg] bg-primary py-3 text-sm font-bold text-surface-container-lowest transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(255,194,127,0.5)] disabled:opacity-60"
        >
          <span className="block skew-x-[10deg]">
            {isSearching ? `검색 중... (${elapsedSeconds}초, 최대 10초 소요)` : '전적 검색'}
          </span>
        </button>
      </form>

      {errorMessage && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-left">
          <p className="text-xs text-on-surface-variant">{errorMessage}</p>
          {canRetry && (
            <button
              type="button"
              onClick={handleRetry}
              className="shrink-0 rounded-full border border-outline-variant px-3 py-1 text-xs font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              다시 시도
            </button>
          )}
        </div>
      )}

      {results && results.length > 0 && (
        <div className="mt-3 w-full">
          <p className="mb-2 text-left text-xs font-semibold text-on-surface-variant">
            동명이인이 있을 수 있습니다. 배틀태그 번호는 검색 API가 제공하지 않아 표시할 수 없으니, 아바타·타이틀·최근
            활동 시각으로 본인 계정을 찾아 선택해 주세요.
          </p>
          <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {results.map((result) => {
              const activity = formatRelativeActivity(result.lastUpdatedAt);
              return (
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
                      <div className="flex items-center gap-1.5">
                        {result.title && <p className="truncate text-xs text-on-surface-variant">{result.title}</p>}
                        {result.title && activity && <span className="text-on-surface-variant/40">·</span>}
                        {activity && <p className="shrink-0 text-xs text-on-surface-variant/70">{activity}</p>}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
