import { Search, User } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useMyProfileStore } from '../../store/useMyProfileStore';

const NAV_LINKS = [
  { to: ROUTES.tierList, label: '메타' },
  { to: ROUTES.search, label: '통계' },
  { to: ROUTES.patchNotes, label: '패치노트' },
];

export function TopNavBar() {
  const navigate = useNavigate();
  const myBattleTag = useMyProfileStore((state) => state.myBattleTag);
  const accountTo = myBattleTag ? ROUTES.profile(myBattleTag) : ROUTES.search;

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-outline-variant bg-surface-dim/90 px-4 py-3 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-8">
        <Link to={ROUTES.home} className="font-headline-md text-headline-md italic tracking-tighter text-primary">
          WATCHMETA
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `italic font-bold tracking-wide transition-all hover:opacity-80 ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to={accountTo}
            className={({ isActive }) =>
              `italic font-bold tracking-wide transition-all hover:opacity-80 ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`
            }
          >
            계정
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(ROUTES.search)}
          aria-label="검색"
          className="text-on-surface-variant transition-colors hover:text-primary"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => navigate(accountTo)}
          aria-label="계정"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary-fixed-dim p-0.5"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-surface-container">
            <User className="h-4 w-4 text-on-surface-variant" />
          </span>
        </button>
      </div>
    </header>
  );
}
