import type { HeroRole } from './hero';

export interface PatchAbilityChange {
  ability?: string;
  bullets: string[];
}

export interface PatchHeroChange {
  hero: string;
  role: HeroRole;
  portraitUrl?: string;
  description?: string;
  changes: PatchAbilityChange[];
}

export interface PatchSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  heroes?: PatchHeroChange[];
}

export interface PatchNote {
  version: string;
  patchDate: string;
  title: string;
  highlight?: string;
  sections: PatchSection[];
}
