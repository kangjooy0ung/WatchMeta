interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = '문제가 발생했어요. 다시 시도해 주세요.' }: ErrorStateProps) {
  return <p role="alert">{message}</p>;
}
