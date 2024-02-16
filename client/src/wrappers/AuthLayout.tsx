import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';

const AuthLayout = () => {
  return (
    <main className='h-screen flex flex-col justify-center items-center bg-bg-light-2 dark:bg-bg-dark-2 p-2 px-6'>
      <nav className='absolute top-3 lg:top-6 left-[50%] translate-x-[-50%]'>
        <Logo />
      </nav>
      <section className='w-full md:w-[375px]'>
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
