import { BarChart3, Home, Map, Newspaper, Search, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const TABS = [
  { to: ROUTES.home, label: '홈', icon: Home, end: true },
  { to: ROUTES.tierList, label: '티어표', icon: BarChart3, end: false },
  { to: ROUTES.perks, label: '특전', icon: Sparkles, end: false },
  { to: ROUTES.mapStats, label: '전장승률', icon: Map, end: false },
  { to: ROUTES.search, label: '전적검색', icon: Search, end: false },
  { to: ROUTES.patchNotes, label: '패치노트', icon: Newspaper, end: false },
];

export function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-outline-variant bg-surface-dim/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`
            }
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
