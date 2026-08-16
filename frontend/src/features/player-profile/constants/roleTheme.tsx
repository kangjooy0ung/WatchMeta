import { Cross, Shield, Swords } from 'lucide-react';
import type { ComponentProps, ComponentType } from 'react';
import type { HeroRole } from '../../../types/hero';

// Swords 아이콘은 lucide 원본 도형 자체가 시각적 중심보다 살짝 아래로 치우쳐 있어,
// 다른 역할 아이콘·텍스트와 나란히 놓였을 때 y축이 어긋나 보인다. 미세 보정.
function DamageIcon(props: ComponentProps<typeof Swords>) {
  return <Swords {...props} style={{ ...props.style, transform: 'translateY(-1px)' }} />;
}

export const ROLE_ICON: Record<HeroRole, ComponentType<ComponentProps<typeof Shield>>> = {
  tank: Shield,
  damage: DamageIcon,
  support: Cross,
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
