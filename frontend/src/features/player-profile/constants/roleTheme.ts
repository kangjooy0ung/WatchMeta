import { HeartPulse, Shield, Swords } from 'lucide-react';
import type { HeroRole } from '../../../types/hero';

export const ROLE_ICON: Record<HeroRole, typeof Shield> = {
  tank: Shield,
  damage: Swords,
  support: HeartPulse,
};

export const ROLE_TEXT_COLOR: Record<HeroRole, string> = {
  tank: 'text-tank-blue',
  damage: 'text-damage-red',
  support: 'text-support-yellow',
};

export const ROLE_SEGMENT_CLASS: Record<HeroRole, string> = {
  tank: 'active-tank',
  damage: 'active-damage',
  support: 'active-support',
};

export const ROLE_LABEL: Record<HeroRole, string> = {
  tank: '탱커',
  damage: '공격',
  support: '지원',
};
