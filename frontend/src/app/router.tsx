import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { MapDetailPage } from '../pages/MapDetailPage/MapDetailPage';
import { MapStatsPage } from '../pages/MapStatsPage/MapStatsPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { PatchNotesPage } from '../pages/PatchNotesPage/PatchNotesPage';
import { HeroPerkDetailPage } from '../pages/PerksPage/HeroPerkDetailPage';
import { PerksPage } from '../pages/PerksPage/PerksPage';
import { PlayerHeroDetailPage } from '../pages/PlayerHeroDetailPage/PlayerHeroDetailPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { HeroDetailPage } from '../pages/TierListPage/HeroDetailPage';
import { TierListPage } from '../pages/TierListPage/TierListPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile/:battleTag" element={<ProfilePage />} />
      <Route path="/profile/:battleTag/heroes/:heroId" element={<PlayerHeroDetailPage />} />
      <Route path="/tier-list" element={<TierListPage />} />
      <Route path="/maps" element={<MapStatsPage />} />
      <Route path="/maps/:mapKey" element={<MapDetailPage />} />
      <Route path="/tier-list/:heroId" element={<HeroDetailPage />} />
      <Route path="/perks" element={<PerksPage />} />
      <Route path="/perks/:heroId" element={<HeroPerkDetailPage />} />
      <Route path="/patch-notes" element={<PatchNotesPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
