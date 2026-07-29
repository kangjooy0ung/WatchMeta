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
  return (
    <label className="flex flex-1 cursor-pointer flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors hover:border-primary">
      <span className="text-label-sm font-label-sm text-on-surface-variant">패치</span>
      <div className="flex items-center gap-1">
        <select
          value={version}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent font-bold text-on-surface focus:outline-none"
        >
          {versions.map((v) => (
            <option key={v.value} value={v.value} className="bg-surface-container text-on-surface">
              {v.label}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant" />
      </div>
    </label>
  );
}
