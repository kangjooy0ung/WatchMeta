import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">{children}</div>
  );
}
