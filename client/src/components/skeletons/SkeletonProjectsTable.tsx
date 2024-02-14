import Skeleton from './Skeleton';

const SkeletonProjectsTable = () => {
  return (
    <div className='flex flex-col gap-2 w-full xl:max-w-[40vw]'>
      <Skeleton className='h-24 lg:h-32' />
      <Skeleton className='h-24 lg:h-32' />
      <Skeleton className='h-24 lg:h-32' />
      <Skeleton className='h-24 lg:h-32' />
    </div>
  );
};

export default SkeletonProjectsTable;
