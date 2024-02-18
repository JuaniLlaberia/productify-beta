import Logo from './Logo';

const Loading = () => {
  return (
    <main className=' h-screen w-full flex flex-col items-center justify-center bg-bg-light-2 dark:bg-bg-dark-2'>
      <span className='animate-pulse'>
        <Logo />
      </span>
    </main>
  );
};

export default Loading;
