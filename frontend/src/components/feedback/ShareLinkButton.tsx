import { Check, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export function ShareLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 권한이 없는 환경(구형 브라우저 등)에서는 조용히 무시한다.
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          링크 복사됨
        </>
      ) : (
        <>
          <LinkIcon className="h-3.5 w-3.5" />
          공유 링크 복사
        </>
      )}
    </button>
  );
}
