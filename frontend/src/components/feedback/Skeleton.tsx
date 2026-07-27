interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`rounded bg-gray-200 dark:bg-gray-800 ${className}`} />;
}
