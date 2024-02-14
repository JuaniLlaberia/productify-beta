import { ComponentProps } from 'react';
import { cn } from '../../utils/shadcnUtils';

const Skeleton = ({ className }: {} & ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-muted bg-bg-light-hover-2 min-w-[10px]',
        className
      )}
    />
  );
};

export default Skeleton;
