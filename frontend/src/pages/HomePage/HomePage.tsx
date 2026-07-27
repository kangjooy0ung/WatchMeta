import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { ROUTES } from '../../constants/routes';
import { SearchBar } from '../../features/player-search/components/SearchBar';

export function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (battleTag: string) => {
    navigate(ROUTES.profile(battleTag));
  };

  return (
    <PageContainer>
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Watch<span className="text-orange-500">Meta</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">내 전적 분석과 실시간 메타를 한 눈에</p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
    </PageContainer>
  );
}
