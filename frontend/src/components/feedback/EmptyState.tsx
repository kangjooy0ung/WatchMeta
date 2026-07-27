interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = '표시할 데이터가 없어요.' }: EmptyStateProps) {
  return <p>{message}</p>;
}
