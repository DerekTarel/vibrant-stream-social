import { cn } from '../../lib/utils';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden', className)}>
      {children}
    </div>
  );
}