import { memo } from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

const Skeleton = memo(({ className }: SkeletonProps) => (
  <div className={clsx('animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800', className)} />
));

export default Skeleton;
