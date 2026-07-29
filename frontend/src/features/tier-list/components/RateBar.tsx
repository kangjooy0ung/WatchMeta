interface RateBarProps {
  label: string;
  percentage: number;
  colorClass: string;
}

export function RateBar({ label, percentage, colorClass }: RateBarProps) {
  const filled = Math.min(100, Math.max(0, percentage));

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        <span>{label}</span>
        <span className="text-on-surface">{percentage}%</span>
      </div>
      <div className="rate-bar flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-surface-container-low">
        <div className={`h-full ${colorClass}`} style={{ flexGrow: filled, flexBasis: 0 }} />
        <div className="h-full bg-surface-variant" style={{ flexGrow: 100 - filled, flexBasis: 0 }} />
      </div>
    </div>
  );
}
