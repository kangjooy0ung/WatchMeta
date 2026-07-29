import { Info } from 'lucide-react';

interface InfoNoteProps {
  message: string;
}

export function InfoNote({ message }: InfoNoteProps) {
  return (
    <p className="flex items-start gap-1.5 text-label-sm font-label-sm text-on-surface-variant/80">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}
