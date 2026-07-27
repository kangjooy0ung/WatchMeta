import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { ROUTES } from '../../constants/routes';
import { RecentSearchList } from '../../features/player-search/components/RecentSearchList';
import { SearchBar } from '../../features/player-search/components/SearchBar';

export function SearchPage() {
  const navigate = useNavigate();

  const handleSearch = (battleTag: string) => {
    navigate(ROUTES.profile(battleTag));
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center pt-6">
        <SearchBar onSearch={handleSearch} />
        <RecentSearchList onSelect={handleSearch} />
      </div>
    </PageContainer>
  );
}
