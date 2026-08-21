import { ChevronDown } from 'lucide-react';

const SERVERS = ['한국', '아시아', '중국', '북미', '유럽'];

// 2026-08-12 넥슨 한국 서비스 전환 이후 한국 서버는 이 사이트의 데이터 출처(블리자드 공식 통계
// 페이지)와 분리 운영돼 자체 픽률·승률을 확보하지 못했다. 중국도 오래전부터 별도 서비스라 마찬가지.
// 실제 데이터가 없는 지역에 임의 수치를 지어내는 대신, 선택은 허용하되 데이터 없음을 명시한다.
export const SERVERS_WITHOUT_DATA = ['한국', '중국'];

interface ServerFilterProps {
  server: string;
  onChange: (server: string) => void;
}

export function ServerFilter({ server, onChange }: ServerFilterProps) {
  const hasData = !SERVERS_WITHOUT_DATA.includes(server);

  return (
    <div className="relative flex flex-1 cursor-pointer flex-col rounded-xl border border-outline-variant bg-surface-container p-3 transition-colors hover:border-primary">
      <span className="text-label-sm font-label-sm text-on-surface-variant">서버</span>
      <div className="flex items-center gap-1">
        <span className="w-full truncate font-bold text-on-surface">{server}</span>
        {!hasData && (
          <span className="shrink-0 rounded-full bg-tier-s/20 px-1.5 py-0.5 text-[9px] font-semibold text-tier-s">
            데이터 없음
          </span>
        )}
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
            {SERVERS_WITHOUT_DATA.includes(s) ? `${s} (데이터 없음)` : s}
          </option>
        ))}
      </select>
    </div>
  );
}
