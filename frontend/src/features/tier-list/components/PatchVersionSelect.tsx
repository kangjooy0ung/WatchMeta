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
  // 과거 패치별 스냅샷 데이터가 아직 없어 선택지가 하나뿐일 때는, 클릭해도 아무 일도
  // 일어나지 않는 가짜 드롭다운 대신 비활성 상태의 정보 표시로 보여준다.
  const isSelectable = versions.length > 1;

  return (
    <div
      aria-disabled={!isSelectable}
      className={`relative flex flex-1 flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors ${
        isSelectable ? 'cursor-pointer hover:border-primary' : 'opacity-70'
      }`}
    >
      <span className="text-label-sm font-label-sm text-on-surface-variant">패치</span>
      <div className="flex items-center gap-1">
        <span className="w-full truncate font-bold text-on-surface">{currentLabel}</span>
        {isSelectable ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant" />
        ) : (
          <span className="shrink-0 text-[10px] text-on-surface-variant/70">단일 패치</span>
        )}
      </div>
      {isSelectable && (
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
      )}
    </div>
  );
}
