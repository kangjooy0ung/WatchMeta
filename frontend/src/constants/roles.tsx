import { Cross, Shield, Swords } from 'lucide-react';
import type { ComponentProps, ComponentType } from 'react';
import type { HeroRole } from '../types/hero';

// Swords 아이콘은 lucide 원본 도형 자체가 시각적 중심보다 살짝 아래로 치우쳐 있어,
// 다른 역할 아이콘·텍스트와 나란히 놓였을 때 y축이 어긋나 보인다. 미세 보정.
function DamageIcon(props: ComponentProps<typeof Swords>) {
  return <Swords {...props} style={{ ...props.style, transform: 'translateY(-1px)' }} />;
}

export const ROLES: { id: HeroRole; label: string }[] = [
  { id: 'tank', label: '탱커' },
  { id: 'damage', label: '딜러' },
  { id: 'support', label: '힐러' },
];

// 색상 조합은 dataviz 가이드의 validate_palette 스크립트로 라이트/다크 모드 모두 검증됨
// (emerald-500은 다크 모드에서 명도 기준 실패 + 라이트 모드 대비 경고가 있어 emerald-600으로 조정)
export const ROLE_BADGE_COLOR: Record<HeroRole, string> = {
  tank: 'bg-blue-500',
  damage: 'bg-red-500',
  support: 'bg-emerald-600',
};

export const ROLE_ICON: Record<HeroRole, ComponentType<ComponentProps<typeof Shield>>> = {
  tank: Shield,
  damage: DamageIcon,
  support: Cross,
};

// Overwatch Kinetic 다크 테마(DESIGN.md) 토큰 기준 역할 강조색
export const ROLE_ACCENT_COLOR: Record<HeroRole, string> = {
  tank: 'text-tank-blue',
  damage: 'text-damage-red',
  support: 'text-support-yellow',
};

export const ROLE_RING_COLOR: Record<HeroRole, string> = {
  tank: 'border-tank-blue',
  damage: 'border-damage-red',
  support: 'border-support-yellow',
};
