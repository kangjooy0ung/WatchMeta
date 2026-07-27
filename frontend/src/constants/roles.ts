import type { HeroRole } from '../types/hero';

export const ROLES: { id: HeroRole; label: string }[] = [
  { id: 'tank', label: '탱커' },
  { id: 'damage', label: '딜러' },
  { id: 'support', label: '힐러' },
];

export const ROLE_BADGE_COLOR: Record<HeroRole, string> = {
  tank: 'bg-blue-500',
  damage: 'bg-red-500',
  support: 'bg-emerald-500',
};
