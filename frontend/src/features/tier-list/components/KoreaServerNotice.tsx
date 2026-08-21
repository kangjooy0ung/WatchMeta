import { AlertTriangle } from 'lucide-react';

interface KoreaServerNoticeProps {
  server: string;
}

export function KoreaServerNotice({ server }: KoreaServerNoticeProps) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-tier-s/40 bg-tier-s/10 p-3 text-xs leading-relaxed text-on-surface">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-tier-s" />
      <p>
        <span className="font-semibold">{server} 서버 자체 데이터는 아직 없습니다.</span> 2026년 8월 12일부터
        한국 PC 서버는 넥슨이 별도로 운영해, 이 사이트가 쓰는 블리자드 공식 통계 페이지에는 반영되지 않습니다.
        (중국 서버도 오래전부터 별도 운영이라 마찬가지입니다.) 아래 수치는 대신 아시아 서버 기준 참고값입니다.
      </p>
    </div>
  );
}
