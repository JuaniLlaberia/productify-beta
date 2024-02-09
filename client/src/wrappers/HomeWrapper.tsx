import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

const HomeWrapper = () => {
  return (
    <section className='w-full h-screen flex flex-col flex-1 max-h-screen bg-bg-light-1 dark:bg-bg-dark-1  transition-transform overflow-y-auto overflow-x-hidden  z-50'>
      <Navbar />
      <div className='h-full w-full flex overflow-x-scroll overflow-y-scroll flex-col items-center pb-4 pt-2 px-6 lg:px-20 transition-all md:scrollbar md:scrollbar-thumb-scroll-light-hover hover:md:scrollbar-thumb-scroll-light'>
        <Outlet />
      </div>
    </section>
  );
};

export default HomeWrapper;
