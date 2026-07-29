import type { TierListEntry } from '../../../types/tier';

interface MetaStatsSummaryProps {
  entries: TierListEntry[];
  rank: string;
  patchLabel: string;
}

export function MetaStatsSummary({ entries, rank, patchLabel }: MetaStatsSummaryProps) {
  if (entries.length === 0) return null;

  const topPick = entries.reduce((best, entry) => (entry.pickRate > best.pickRate ? entry : best));
  const topWin = entries.reduce((best, entry) => (entry.winRate > best.winRate ? entry : best));

  const stats = [
    { label: '최고 픽률', value: topPick.heroName, sub: `${topPick.pickRate}%`, borderClass: 'border-primary', valueClass: 'text-primary' },
    { label: '최고 승률', value: topWin.heroName, sub: `${topWin.winRate}%`, borderClass: 'border-secondary', valueClass: 'text-secondary' },
    { label: '표시 중인 랭크', value: rank, sub: null, borderClass: 'border-tier-s', valueClass: 'text-tier-s' },
    { label: '적용 패치', value: patchLabel, sub: null, borderClass: 'border-support-yellow', valueClass: 'text-support-yellow' },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`-skew-x-[10deg] overflow-hidden rounded-xl border-t-2 bg-surface-container-high ${stat.borderClass}`}
        >
          <div className="skew-x-[10deg] p-4">
            <h3 className="mb-2 text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant">
              {stat.label}
            </h3>
            <p className={`truncate font-headline-md italic ${stat.valueClass}`}>{stat.value}</p>
            {stat.sub && <p className="text-xs text-on-surface-variant">{stat.sub}</p>}
          </div>
        </div>
      ))}
    </section>
  );
}
