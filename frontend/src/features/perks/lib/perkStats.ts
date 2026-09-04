import { ALL_HEROES } from '../../../constants/heroes';
import type { HeroRole } from '../../../types/hero';
import { HERO_PERKS, type Perk } from '../data/heroPerks';

export type PerkTier = 'minor' | 'major';

export interface PerkPick extends Perk {
  heroId: string;
  heroName: string;
  heroRole: HeroRole;
  heroPortraitUrl: string;
  tier: PerkTier;
  /** 같은 등급에서 선택되지 않은 나머지 특전 이름 */
  alternativeName: string;
}

function pairToPicks(heroId: string): { minor: PerkPick[]; major: PerkPick[] } | null {
  const hero = ALL_HEROES.find((h) => h.id === heroId);
  const perks = HERO_PERKS[heroId];
  if (!hero || !perks) return null;

  const build = (list: readonly [Perk, Perk], tier: PerkTier): PerkPick[] =>
    list.map((perk, index) => ({
      ...perk,
      heroId,
      heroName: hero.name,
      heroRole: hero.role,
      heroPortraitUrl: hero.portraitUrl,
      tier,
      alternativeName: list[index === 0 ? 1 : 0].name,
    }));

  return { minor: build(perks.minor, 'minor'), major: build(perks.major, 'major') };
}

/** 각 영웅·등급에서 커뮤니티 선호율이 더 높은 특전 하나씩만 모은다. */
export function preferredPicks(): PerkPick[] {
  const picks: PerkPick[] = [];
  for (const hero of ALL_HEROES) {
    const pair = pairToPicks(hero.id);
    if (!pair) continue;
    for (const group of [pair.minor, pair.major]) {
      const top = [...group].sort((a, b) => b.preferRate - a.preferRate)[0];
      if (top) picks.push(top);
    }
  }
  return picks;
}

/** 커뮤니티 의견이 한쪽으로 가장 굳어진 특전 (선호율 높은 순) */
export function consensusPicks(limit = 8): PerkPick[] {
  return preferredPicks()
    .sort((a, b) => b.preferRate - a.preferRate)
    .slice(0, limit);
}

/** 커뮤니티 의견이 가장 팽팽하게 갈리는 특전 (50%에 가까운 순) */
export function contestedPicks(limit = 6): PerkPick[] {
  return preferredPicks()
    .sort((a, b) => a.preferRate - b.preferRate)
    .slice(0, limit);
}

export interface HeroTopPerks {
  minor: Perk;
  major: Perk;
}

/** 목록 카드에서 미리보기로 쓸, 영웅별 가장 선호되는 소형·대형 특전 */
export function heroTopPerks(heroId: string): HeroTopPerks | null {
  const perks = HERO_PERKS[heroId];
  if (!perks) return null;
  const pick = (list: readonly [Perk, Perk]) => [...list].sort((a, b) => b.preferRate - a.preferRate)[0];
  return { minor: pick(perks.minor), major: pick(perks.major) };
}
