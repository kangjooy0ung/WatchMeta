export type HeroRole = 'tank' | 'damage' | 'support';

export interface Hero {
  id: string;
  name: string;
  role: HeroRole;
  portraitUrl: string;
  // 출시된 지 얼마 안 돼 메타가 아직 안정되지 않은 영웅에 표시. 출시일 데이터가 없어 수동으로 관리한다.
  isNew?: boolean;
}
