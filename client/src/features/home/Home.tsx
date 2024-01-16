import { Link } from 'react-router-dom';

import ProjectsTable from '../projects/ProjectsTable';
import AlertCard from '../../components/AlertCard';
import NewProjectsLink from './NewProjectsLink';
import { useUserContext } from '../../context/UserContext';

const HomeTable = () => {
  const { user } = useUserContext();

  return (
    <section className='flex flex-col w-full xl:max-w-[40vw]'>
      <header className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl lg:text-3xl font-semibold text-text-light-1 dark:text-text-dark-1'>
          Your Projects
        </h1>
      </header>

      {user?.data?.projectsLeft === 0 ? (
        <AlertCard message='Project limit reached (3). Delete one or upgrade your membership.' />
      ) : (
        <NewProjectsLink />
      )}

      <ProjectsTable />
      <p className='text-text-light-2 dark:text-text-dark-2 text-sm lg:text-base xl:text-lg text-center mt-3'>
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
