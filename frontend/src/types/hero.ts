export type HeroRole = 'tank' | 'damage' | 'support';

export interface Hero {
  id: string;
  name: string;
  role: HeroRole;
  portraitUrl: string;
}
