import { Outlet } from 'react-router-dom';
import { SettingSidebar } from '../features/settings/SettingSidebar';

const SettingsPage = () => {
  return (
    <>
      <h1 className='w-full px-8 text-2xl xl:text-3xl xl:mb-3 font-semibold text-text-light-1 dark:text-text-dark-1'>
        User Settings
      </h1>
      <section className='flex w-full gap-6 p-6'>
        <SettingSidebar />
        <div className='w-full bg-bg-light-2 dark:bg-bg-dark-2 rounded-lg border border-border-light dark:border-border-dark p-2'>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SettingsPage;
