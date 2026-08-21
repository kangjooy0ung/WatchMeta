import { useEffect } from 'react';

interface ToastProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss: () => void;
  durationMs?: number;
}

export function Toast({ message, actionLabel, onAction, onDismiss, durationMs = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
  }, [onDismiss, durationMs]);

  return (
    <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex w-fit max-w-sm items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-high px-4 py-3 shadow-lg lg:bottom-6">
      <p className="text-sm text-on-surface">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-sm font-semibold text-primary hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
