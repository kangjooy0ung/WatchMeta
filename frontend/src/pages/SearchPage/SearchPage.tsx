import { useNavigate } from 'react-router-dom';
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
        <SearchBar onSearch={handleSearch} />
        <RecentSearchList onSelect={handleSearch} />
      </div>
    </div>
  );
}
