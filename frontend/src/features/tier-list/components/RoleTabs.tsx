import { ROLES, ROLE_ACCENT_COLOR, ROLE_ICON } from '../../../constants/roles';
import type { HeroRole } from '../../../types/hero';

interface RoleTabsProps {
  role: HeroRole | 'all';
  onChange: (role: HeroRole | 'all') => void;
}

export function RoleTabs({ role, onChange }: RoleTabsProps) {
  return (
    <div role="group" aria-label="역할 필터" className="flex rounded-xl border border-outline-variant bg-surface-container-high p-1">
      <button
        type="button"
        aria-pressed={role === 'all'}
        onClick={() => onChange('all')}
        className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all active:scale-95 ${
          role === 'all'
            ? 'bg-primary text-surface-container-lowest'
            : 'text-on-surface-variant hover:bg-surface-variant/40'
        }`}
      >
        전체
      </button>
      {ROLES.map(({ id, label }) => {
        const Icon = ROLE_ICON[id];
        const isActive = role === id;
        return (
          <button
            key={id}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 transition-all active:scale-95 ${
              isActive ? 'bg-primary' : 'hover:bg-surface-variant/40'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'text-surface-container-lowest' : ROLE_ACCENT_COLOR[id]}`} />
            <span
              className={`hidden text-sm font-bold sm:inline ${
                isActive ? 'text-surface-container-lowest' : 'text-on-surface-variant'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
