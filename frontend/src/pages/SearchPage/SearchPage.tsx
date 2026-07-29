import { useNavigate } from 'react-router-dom';
import { InfoNote } from '../../components/feedback/InfoNote';
import { ROUTES } from '../../constants/routes';
import { RecentSearchList } from '../../features/player-search/components/RecentSearchList';
import { SearchBar } from '../../features/player-search/components/SearchBar';

export function SearchPage() {
  const navigate = useNavigate();

  const handleSearch = (battleTag: string) => {
    navigate(ROUTES.profile(battleTag));
  };

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pt-6 lg:px-8">
        <div className="mb-4 w-full">
          <h1 className="font-headline-lg text-headline-md italic text-primary">전적 검색</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            배틀태그로 다른 플레이어의 전적을 조회할 수 있어요. 조회한 프로필에서 ⭐를 누르면 내 계정으로 저장되어
            상단 &apos;계정&apos; 메뉴에서 바로 확인할 수 있습니다.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-3 w-full">
          <InfoNote message="배틀넷 개인정보 설정에서 프로필을 '공개'로 설정한 계정만 조회할 수 있어요." />
        </div>

        <RecentSearchList onSelect={handleSearch} />
      </div>
    </div>
  );
}
