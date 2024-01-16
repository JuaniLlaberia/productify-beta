import { Link } from 'react-router-dom';

import ProjectsTable from '../projects/ProjectsTable';
import AlertCard from '../../components/AlertCard';
import { useUserContext } from '../../context/UserContext';
import { HiOutlinePlus } from 'react-icons/hi2';

const HomeTable = () => {
  const { user } = useUserContext();

  return (
    <section className='flex flex-col w-full xl:max-w-[40vw]'>
      <header className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl lg:text-3xl font-semibold text-text-light-1 dark:text-text-dark-1'>
          Your Projects
        </h1>
        {user?.data?.projectsLeft !== 0 ? (
          <Link
            to='/project/new'
            className='fixed bottom-5 right-5 bg-bg-light-contrast p-3 rounded-xl text-text-dark-1 md:relative md:top-0 md:right-0 md:flex md:items-center md:gap-2 md:bg-transparent md:py-1 md:px-2 md:text-text-light-2 md:dark:text-text-dark-2 md:rounded-lg 2xl:text-lg md:hover:bg-bg-light-hover-2 dark:md:hover:bg-bg-dark-hover-2 transition-colors'
          >
            <span className='text-3xl md:text-2xl'>
              <HiOutlinePlus />
            </span>
            <span className='hidden md:block'>Add new project</span>
          </Link>
        ) : null}
      </header>

      {user?.data?.projectsLeft === 0 ? (
        <AlertCard message='Project limit reached (3). Delete one or upgrade your membership.' />
      ) : null}

      <ProjectsTable />
      <p className='text-text-light-2 dark:text-text-dark-2 text-sm lg:text-base text-center mt-3'>
        Problems finding your project?{' '}
        <span>
          <Link
            to='/home'
            className='text-special-color font-semibold hover:underline'
          >
            Click here
          </Link>
        </span>
      </p>
    </section>
  );
};

export default HomeTable;
