interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = '문제가 발생했어요. 다시 시도해 주세요.', onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="glass-panel flex flex-col items-start gap-3 rounded-xl p-4">
      <p className="text-sm text-on-surface-variant">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-outline-variant px-4 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
