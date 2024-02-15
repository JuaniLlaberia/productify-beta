import Skeleton from './Skeleton';

export const SkeletonTasks = () => {
  return (
    <ul className='flex w-full h-full items-start gap-6'>
      <Skeleton className='w-full h-full' />
      <Skeleton className='w-full h-full hidden md:block' />
      <Skeleton className='w-full h-full hidden lg:block' />
      <Skeleton className='w-full h-full hidden xl:block' />
      <Skeleton className='w-full h-full hidden 2xl:block' />
    </ul>
  );
};
