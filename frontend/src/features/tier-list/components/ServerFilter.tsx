import { ChevronDown } from 'lucide-react';

const SERVERS = ['아시아', '아메리카', '유럽'];

interface ServerFilterProps {
  server: string;
  onChange: (server: string) => void;
}

export function ServerFilter({ server, onChange }: ServerFilterProps) {
  return (
    <div className="relative flex flex-1 cursor-pointer flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors hover:border-primary">
      <span className="text-label-sm font-label-sm text-on-surface-variant">서버</span>
      <div className="flex items-center gap-1">
        <span className="w-full truncate font-bold text-on-surface">{server}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant" />
      </div>
      <select
        aria-label="서버"
        value={server}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {SERVERS.map((s) => (
          <option key={s} value={s} className="bg-surface-container text-on-surface">
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
