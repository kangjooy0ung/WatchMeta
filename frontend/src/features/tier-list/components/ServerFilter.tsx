import { ChevronDown } from 'lucide-react';

// 데이터 출처인 넥슨 공식 영웅 통계 페이지(overwatch.nexon.com/hero/rate)가 나누는 지역 그대로.
// 블리자드 글로벌 페이지에는 없던 '한국'이 여기엔 별도 항목으로 있어 국내 서버 수치를 그대로 쓴다.
// 라벨 '북미'는 넥슨 표기('아메리카')와 다르지만, 기존 공유 링크(?server=북미)가 깨지지 않도록 유지한다.
const SERVERS = ['한국', '아시아', '북미', '유럽'];

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
