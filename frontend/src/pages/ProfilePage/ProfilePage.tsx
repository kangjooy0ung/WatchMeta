import { Star, User } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { usePlayerSearch } from '../../features/player-search/hooks/usePlayerSearch';
import { useMyProfileStore } from '../../store/useMyProfileStore';
import { HeroesTab } from './HeroesTab';
import { MatchesTab } from './MatchesTab';
import { OverviewTab } from './OverviewTab';

type ProfileTab = 'overview' | 'heroes' | 'matches';

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'overview', label: '오버뷰' },
  { id: 'heroes', label: '영웅별' },
  { id: 'matches', label: '최근 전적' },
];

function isProfileTab(value: string | null): value is ProfileTab {
  return value === 'overview' || value === 'heroes' || value === 'matches';
}

export function ProfilePage() {
  const { battleTag } = useParams<{ battleTag: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = usePlayerSearch(battleTag);
  const myBattleTag = useMyProfileStore((state) => state.myBattleTag);
  const setMyBattleTag = useMyProfileStore((state) => state.setMyBattleTag);
  const clearMyBattleTag = useMyProfileStore((state) => state.clearMyBattleTag);

  if (!battleTag) return null;

  const isMine = myBattleTag === battleTag;

  const tabParam = searchParams.get('tab');
  const activeTab: ProfileTab = isProfileTab(tabParam) ? tabParam : 'overview';

  const handleTabChange = (tab: ProfileTab) => {
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <PageContainer>
      <div className="flex items-center gap-3 py-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          {data?.avatarUrl ? (
            <img src={data.avatarUrl} alt={battleTag} className="h-full w-full object-cover" />
          ) : (
            <User className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-gray-900 dark:text-white">{battleTag}</p>
          {data?.title && <p className="text-xs text-gray-500 dark:text-gray-400">{data.title}</p>}
        </div>
        <button
          type="button"
          onClick={() => (isMine ? clearMyBattleTag() : setMyBattleTag(battleTag))}
          aria-label={isMine ? '내 계정으로 저장 해제' : '내 계정으로 저장'}
          className={`shrink-0 rounded-full p-2 transition-colors ${
            isMine ? 'text-amber-400' : 'text-gray-300 hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-500'
          }`}
        >
          <Star className="h-5 w-5" fill={isMine ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="sticky top-0 z-10 -mx-4 flex border-b border-gray-200 bg-white/95 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-400 dark:text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-4">
        {activeTab === 'overview' && <OverviewTab battleTag={battleTag} />}
        {activeTab === 'heroes' && <HeroesTab battleTag={battleTag} />}
        {activeTab === 'matches' && <MatchesTab battleTag={battleTag} />}
      </div>
    </PageContainer>
  );
}
