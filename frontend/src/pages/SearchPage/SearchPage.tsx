import { useNavigate } from 'react-router-dom';
import { InfoNote } from '../../components/feedback/InfoNote';
import { ROUTES } from '../../constants/routes';
import { RecentSearchList } from '../../features/player-search/components/RecentSearchList';
import { SearchBar } from '../../features/player-search/components/SearchBar';
import { useDocumentMeta } from '../../lib/useDocumentMeta';

export function SearchPage() {
  const navigate = useNavigate();
  useDocumentMeta({
    title: '오버워치 전적 검색 | WatchMeta',
    description: '배틀태그로 오버워치 플레이어 전적을 검색하고, 경쟁전 티어·승률·모스트 영웅을 확인하세요.',
    path: ROUTES.search,
  });

  const handleSearch = (battleTag: string) => {
    navigate(ROUTES.profile(battleTag));
  };

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pt-6 lg:px-8">
        <div className="mb-4 w-full">
          <h1 className="font-headline-lg text-headline-md italic text-primary">전적 검색</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            닉네임으로 다른 플레이어의 전적을 검색해 보세요. 동명이인이 있으면 목록에서 직접 골라야 해요. 프로필에서
            ⭐를 누르면 내 계정으로 저장되고, 상단 &apos;계정&apos; 메뉴에서 언제든 바로 확인할 수 있어요.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-3 w-full space-y-1.5">
          <InfoNote message="배틀넷 및 오버워치 개인정보 설정에서 프로필을 '공개'로 설정한 계정만 조회할 수 있습니다." />
          <InfoNote message="2026년 8월 12일부터 한국 PC 서버는 넥슨이 별도로 운영합니다. 이 사이트는 블리자드 공식 통계를 기반으로 하기 때문에, 그 이후 한국 서버에서 쌓인 전적은 반영되지 않을 수 있습니다." />
        </div>

        <RecentSearchList onSelect={handleSearch} />
      </div>
    </div>
  );
}
