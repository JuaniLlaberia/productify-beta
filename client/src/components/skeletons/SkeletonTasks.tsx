import Skeleton from './Skeleton';

export const SkeletonTasks = () => {
  return (
    <ul className='h-full flex gap-4 mb-10'>
      <Skeleton className='w-[325px]' />
    </ul>
  );
};
