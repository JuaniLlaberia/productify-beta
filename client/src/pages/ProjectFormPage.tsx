import { Link } from 'react-router-dom';
import ProjectsForm from '../features/projects/ProjectsForm';

const ProjectNew = () => {
  return (
    <main className='h-screen flex flex-col justify-center items-center bg-bg-light-1 p-2 px-6'>
      <header className='mb-6'>
        <h3 className='text-center text-2xl lg:text-3xl mb-1 font-semibold'>
          Create a project
        </h3>
        <p className='text-text-light-2 dark:text-text-dark-2 lg:text-lg'>
          Let's start by naming your new project and adding an avatar.
        </p>
      </header>
      <ProjectsForm />
      <Link
        to='/home'
        className='absolute top-4 right-4 px-2 rounded-md text-text-light-2 dark:text-text-dark-2 lg:text-lg hover:bg-[#c4c3c334] transition-colors'
      >
        Cancel
      </Link>
    </main>
  );
};

export default ProjectNew;
