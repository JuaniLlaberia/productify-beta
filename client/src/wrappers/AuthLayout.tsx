import { Outlet, useNavigate } from 'react-router-dom';

import Logo from '../components/Logo';

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <main className='h-screen flex flex-col justify-center items-center bg-bg-light-2 dark:bg-bg-dark-1 p-2 px-6'>
      <nav className='absolute top-3 lg:top-6 left-[50%] translate-x-[-50%]'>
        <Logo onClick={() => navigate('/')} />
      </nav>
      <section className='w-full md:w-[375px]'>
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
