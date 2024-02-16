import Skeleton from './Skeleton';

const SkeletonChatItem = () => {
  return (
    <div className='flex gap-3 mt-3'>
      <Skeleton className='w-12 h-12' />
      <div className='flex flex-col flex-grow gap-1 mt-1'>
        <Skeleton className='h-3 max-w-[400px]' />
        <Skeleton className='h-3 max-w-[250px]' />
      </div>
    </div>
  );
};

const SkeletonChat = () => {
  return (
    <>
      <SkeletonChatItem />
      <SkeletonChatItem />
      <SkeletonChatItem />
      <SkeletonChatItem />
      <SkeletonChatItem />
      <SkeletonChatItem />
      <SkeletonChatItem />
      <SkeletonChatItem />
    </>
  );
};

export default SkeletonChat;
