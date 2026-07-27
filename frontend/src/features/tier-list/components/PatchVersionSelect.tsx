interface PatchVersionSelectProps {
  version: string;
  versions: string[];
  onChange: (version: string) => void;
}

export function PatchVersionSelect({ version, versions, onChange }: PatchVersionSelectProps) {
  return (
    <select value={version} onChange={(e) => onChange(e.target.value)}>
      {versions.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
}
