import { ChevronLeft, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { ALL_MAPS_KEY, GAMEMODE_LABEL, GAMEMODE_ORDER } from '../../features/tier-list/constants/mapModes';
import { MapThumbnail } from '../../features/tier-list/components/MapThumbnail';
import { useCompetitiveMaps } from '../../features/tier-list/hooks/useMapStats';
import { useDocumentMeta } from '../../lib/useDocumentMeta';

export function MapStatsPage() {
  useDocumentMeta({
    title: '오버워치 전장별 영웅 승률 | WatchMeta',
    description: '오버워치 전장(맵)별 영웅 픽률·승률을 확인하세요.',
    path: ROUTES.mapStats,
  });

  const { data: maps } = useCompetitiveMaps();

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 pt-6 lg:px-8">
        <Link
          to={ROUTES.tierList}
          className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          메타로 돌아가기
        </Link>

        <section className="border-l-4 border-primary pl-4">
          <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">전장별 영웅 승률</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">전장을 선택하면 영웅별 픽률·승률을 볼 수 있어요</p>
        </section>

        <section className="space-y-5">
          <Link
            to={ROUTES.mapDetail(ALL_MAPS_KEY)}
            className="flex items-center gap-2 rounded-xl border-2 border-outline-variant px-3 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
          >
            <LayoutGrid className="h-4 w-4 shrink-0" />
            전체 전장 (모든 맵 통합)
          </Link>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
            {GAMEMODE_ORDER.map((mode) => {
              const mapsInMode = (maps ?? []).filter((m) => m.gamemodes.includes(mode));
              if (mapsInMode.length === 0) return null;
              return (
                <div key={mode} className="min-w-0">
                  <p className="mb-2 text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant">
                    {GAMEMODE_LABEL[mode] ?? mode}
                  </p>
                  <div className="flex flex-col gap-3">
                    {mapsInMode.map((map) => (
                      <MapThumbnail key={map.key} map={map} href={ROUTES.mapDetail(map.key)} isActive={false} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
