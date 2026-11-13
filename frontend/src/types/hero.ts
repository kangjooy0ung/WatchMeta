export type HeroRole = 'tank' | 'damage' | 'support';

export interface Hero {
  id: string;
  name: string;
  role: HeroRole;
  portraitUrl: string;
  /** 정식 출시일(ISO). 패치 노트에서 확인한 값. */
  releasedOn?: string;
  /** releasedOn에서 계산한다. 직접 넣지 말 것 — constants/heroes.ts 참고. */
  isNew?: boolean;
}
