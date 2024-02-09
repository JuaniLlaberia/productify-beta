import { Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

import user from '/user.jpg';
import UserDropdownProfile from '../features/user/UserDropdownProfile';
import { SettingSidebar } from '../features/settings/SettingSidebar';
import { useUserContext } from '../context/UserContext';

const SettingsPage = () => {
  const { user: userData } = useUserContext();
  const navigate = useNavigate();

  return (
    <main className='fixed lg:relative top-0 left-0 h-screen w-full bg-bg-light-2 dark:bg-bg-dark-2 overflow-hidden z-50'>
      <header className='sticky lg:relative top-0 p-3 px-5 lg:px-12 bg-bg-light-1 dark:bg-bg-dark-2 flex items-center justify-between gap-3 text-text-light-1 dark:text-text-dark-1 border-b border-border-light dark:border-border-dark lg:bg-transparent lg:border-none'>
        <HiOutlineChevronLeft
          size={18}
          className='lg:hidden'
          onClick={() => navigate(-1)}
        />
        <h1 className='font-semibold lg:text-2xl'>Settings</h1>
        <UserDropdownProfile />
      </header>
      <section className='flex items-center justify-center gap-4 py-5 lg:hidden'>
        <img
          src={user}
          className='w-16 h-16 rounded-2xl border border-border-light dark:border-border-dark'
          draggable={false}
          alt='profile photo'
        />
        <div>
          <h2 className='text-base text-text-light-1 dark:text-text-dark-1 font-semibold'>
            {userData?.data?.firstName} {userData?.data?.lastName}
          </h2>
          <p className='text-sm text-text-light-2 dark:text-text-dark-2'>
            {userData?.data?.email}
          </p>
        </div>
      </section>
      <hr className='border-border-light dark:border-border-dark' />
      <section className='flex w-full gap-16 py-2 px-6'>
        <SettingSidebar />
        <Outlet />
      </section>
    </main>
  );
};

export default SettingsPage;
