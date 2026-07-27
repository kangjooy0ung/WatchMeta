import { HeartPulse, Shield, Swords } from 'lucide-react';
import { ROLES } from '../../../constants/roles';
import type { HeroRole } from '../../../types/hero';

const ROLE_ICON: Record<HeroRole, typeof Shield> = {
  tank: Shield,
  damage: Swords,
  support: HeartPulse,
};

interface RoleTabsProps {
  activeRole: HeroRole;
  onChange: (role: HeroRole) => void;
}

export function RoleTabs({ activeRole, onChange }: RoleTabsProps) {
  return (
    <div className="sticky top-0 z-10 -mx-4 flex border-b border-gray-200 bg-white/95 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      {ROLES.map((role) => {
        const Icon = ROLE_ICON[role.id];
        const isActive = role.id === activeRole;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            className={`flex flex-1 flex-col items-center gap-1 border-b-2 py-3 text-xs font-medium transition-colors ${
              isActive ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 dark:text-gray-500'
            }`}
          >
            <Icon className="h-5 w-5" />
            {role.label}
          </button>
        );
      })}
    </div>
  );
}
