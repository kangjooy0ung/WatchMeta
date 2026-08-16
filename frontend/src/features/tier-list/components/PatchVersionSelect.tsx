import { ChevronDown } from 'lucide-react';

export interface PatchVersionOption {
  value: string;
  label: string;
}

interface PatchVersionSelectProps {
  version: string;
  versions: PatchVersionOption[];
  onChange: (version: string) => void;
}

export function PatchVersionSelect({ version, versions, onChange }: PatchVersionSelectProps) {
  const currentLabel = versions.find((v) => v.value === version)?.label ?? version;

  return (
    <div className="relative flex flex-1 cursor-pointer flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors hover:border-primary">
      <span className="text-label-sm font-label-sm text-on-surface-variant">패치</span>
      <div className="flex items-center gap-1">
        <span className="w-full truncate font-bold text-on-surface">{currentLabel}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant" />
      </div>
      <select
        aria-label="패치"
        value={version}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {versions.map((v) => (
          <option key={v.value} value={v.value} className="bg-surface-container text-on-surface">
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
}
