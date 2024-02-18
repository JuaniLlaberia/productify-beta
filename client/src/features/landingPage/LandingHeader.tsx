import LandingLinkBtn from './LandingLinkBtn';

const LandingHeader = () => {
  return (
    <header className='flex flex-col items-center justify-center text-center my-5 py-10 px-8 md:py-32 md:px-16 lg:py-48 lg:px-64'>
      <h1 className='bg-gradient-to-b from-neutral-950 dark:from-zinc-100 from-40% to-stone-400 dark:to-slate-300 bg-clip-text text-transparent text-3xl/[45px] md:text-5xl/[70px] lg:text-7xl/[100px]'>
        Organize your work
      </h1>
      <h2 className='bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl'>
        Be more efficient
      </h2>
      <p className='text-text-light-2 dark:text-text-dark-2 mt-3.5 mb-6 text-sm md:text-base lg:text-lg lg:mt-5 lg:mb-10'>
        Embrace a new era of productivity and collaboration today. Just be more
        productive.
      </p>
      <LandingLinkBtn
        to='/auth'
        text='Get started now'
      />
    </header>
  );
};

export default LandingHeader;
