import type { PlayerOverviewData } from '../../../types/player';

interface PerformanceCardProps {
  performance: PlayerOverviewData['performance'];
}

function formatThousands(value: number): string {
  return `${(value / 1000).toFixed(1)}K`;
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
  const tiles = [
    { label: '승률', value: `${performance.winRate}%`, borderClass: 'border-primary', colorClass: 'text-primary' },
    {
      label: '처치/데스 비율',
      value: performance.eliminationDeathRatio.toFixed(2),
      borderClass: 'border-secondary',
      colorClass: 'text-secondary',
    },
    {
      label: '10분당 처치',
      value: formatThousands(performance.eliminationsPer10Min),
      borderClass: 'border-tier-b',
      colorClass: 'text-tier-b',
    },
    {
      label: '결정타',
      value: performance.finalBlows.toLocaleString(),
      borderClass: 'border-damage-red',
      colorClass: 'text-damage-red',
    },
  ];

  return (
    <section className="glass-panel flex flex-col gap-4 rounded-xl p-5">
      <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Performance</h3>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div key={tile.label} className={`border-b-2 bg-surface-container-low p-4 ${tile.borderClass}`}>
            <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">{tile.label}</p>
            <p className={`font-stat-value text-xl ${tile.colorClass}`}>{tile.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
