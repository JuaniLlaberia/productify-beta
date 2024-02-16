import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import ProjectNameStep from './ProjectNameStep';
import { useCreateProject } from './useCreateProject';

const ProjectsForm = () => {
  const { createProject, isLoading } = useCreateProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleProjectCreation = handleSubmit(data => {
    createProject({ name: data.projectName });
  });

  return (
    <form
      onSubmit={handleProjectCreation}
      className='flex flex-col w-full md:w-[450px]'
    >
      <section className='h-[140px] lg:h-[160px]'>
        <ProjectNameStep
          error={errors?.projectName?.message as string}
          register={register}
        />
      </section>
      <Button isLoading={isLoading}>Finish</Button>
      <footer className='flex justify-center items-center mt-2'>
        <p className='mt-2 text-text-light-2 dark:text-text-dark-2 lg:text-lg'>
          Having problems?{' '}
          <Link
            to=''
            className='text-special-color font-semibold underline'
          >
            Get help
          </Link>
        </p>
      </footer>
    </form>
  );
};

export default ProjectsForm;
