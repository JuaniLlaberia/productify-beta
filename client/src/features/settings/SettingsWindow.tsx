import { ReactNode } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const SettingsWindow = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className='fixed top-0 left-0 h-full w-full bg-bg-light-2 dark:bg-bg-dark-2 lg:relative lg:bg-transparent lg:p-3 lg:px-16'>
      <section className='sticky lg:relative top-0 p-3 px-5 bg-bg-light-1 dark:bg-bg-dark-1 lg:bg-transparent flex items-center gap-3 text-text-light-1 dark:text-text-dark-1 border-b border-border-light dark:border-border-dark lg:border-none'>
        <Link to='/settings'>
          <HiOutlineChevronLeft size={18} className='lg:hidden' />
        </Link>
        <h1 className='font-semibold text-center lg:text-xl'>{title}</h1>
      </section>
      <section className='px-6'>{children}</section>
    </div>
  );
};

export default SettingsWindow;