import { useNavigate } from 'react-router-dom';
import { InfoNote } from '../../components/feedback/InfoNote';
import { ROUTES } from '../../constants/routes';
import { SearchBar } from '../../features/player-search/components/SearchBar';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useMyProfileStore } from '../../store/useMyProfileStore';

export function HomePage() {
  const navigate = useNavigate();
  const myProfile = useMyProfileStore((state) => state.myProfile);
  useDocumentMeta({
    title: 'WatchMeta - 오버워치 전적검색 · 실시간 메타 티어리스트 (워치메타)',
    description:
      'WatchMeta(워치메타)에서 오버워치 서버·랭크별 영웅 메타 티어리스트, 배틀태그 전적 검색, 영웅 특전(퍽) 정리, 패치노트를 한 곳에서 확인하세요.',
    path: '/',
  });

  const handleSearch = (playerId: string) => {
    navigate(ROUTES.profile(playerId));
  };

  return (
    <div className="bg-background text-on-background">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center gap-8 px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-10 text-center lg:px-8">
        <div>
          <h1 className="font-headline-xl text-headline-xl italic uppercase tracking-tighter text-primary">
            Watch<span className="text-secondary">Meta</span>
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            워치메타 · 오버워치 전적 분석과 실시간 메타를 한 눈에
          </p>
        </div>

        {myProfile && (
          <button
            type="button"
            onClick={() => navigate(ROUTES.profile(myProfile.playerId))}
            className="w-full -skew-x-[10deg] bg-primary py-3 text-sm font-bold text-surface-container-lowest transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(255,194,127,0.5)]"
          >
            <span className="block skew-x-[10deg]">내 전적 보기 ({myProfile.label})</span>
          </button>
        )}

        <div className="glass-panel w-full rounded-xl p-5">
          {myProfile && <p className="mb-2 text-left text-xs text-on-surface-variant">다른 닉네임 검색</p>}
          <SearchBar onSearch={handleSearch} />
          <div className="mt-3 text-left">
            <InfoNote message="배틀넷 및 오버워치 개인정보 설정에서 프로필을 '공개'로 설정한 계정만 조회할 수 있습니다." />
          </div>
        </div>
      </div>
    </div>
  );
}
