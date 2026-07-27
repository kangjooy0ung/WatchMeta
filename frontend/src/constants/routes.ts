export const ROUTES = {
  home: '/',
  search: '/search',
  profile: (battleTag: string) => `/profile/${battleTag}`,
  tierList: '/tier-list',
  heroDetail: (heroId: string) => `/tier-list/${heroId}`,
  patchNotes: '/patch-notes',
  patchNoteDetail: (version: string) => `/patch-notes/${version}`,
} as const;
