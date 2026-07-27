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
    <div className="relative flex-1">
      <select
        value={version}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {versions.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
