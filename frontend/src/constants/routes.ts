export const ROUTES = {
  home: '/',
  search: '/search',
  // battleTag에 포함된 '#'은 URL에서 예약 문자(해시)라 인코딩하지 않으면 라우팅이 깨진다.
  profile: (battleTag: string) => `/profile/${encodeURIComponent(battleTag)}`,
  profileHero: (battleTag: string, heroId: string) => `/profile/${encodeURIComponent(battleTag)}/heroes/${heroId}`,
  tierList: '/tier-list',
  heroDetail: (heroId: string) => `/tier-list/${heroId}`,
  mapStats: '/maps',
  mapDetail: (mapKey: string) => `/maps/${mapKey}`,
  patchNotes: '/patch-notes',
  patchNoteDetail: (version: string) => `/patch-notes/${version}`,
  privacyPolicy: '/privacy',
} as const;
