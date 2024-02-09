import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import ProjectNameStep from './ProjectNameStep';
import ProjectImgStep from './ProjectImgStep';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { useCreateProject } from './useCreateProject';

const ProjectsForm = () => {
  const { createProject, isLoading } = useCreateProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { crrStep, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm([
      <ProjectNameStep
        error={errors?.projectName?.message as string}
        register={register}
      />,
      <ProjectImgStep
        error={errors?.projectImg?.message as string}
        register={register}
      />,
    ]);

  const handleProjectCreation = handleSubmit(data => {
    if (!isLastStep) return nextStep();

    createProject({ name: data.projectName, projectImg: data.projectImg });
  });

  return (
    <form
      onSubmit={handleProjectCreation}
      className='flex flex-col w-full md:w-[450px]'
    >
      <section className='h-[140px] lg:h-[160px]'>{crrStep}</section>
      <Button isLoading={isLoading}>{isLastStep ? 'Finish' : 'Next'}</Button>
      <footer className='flex justify-center items-center mt-2'>
        {!isFirstStep ? (
          <Button
            disabled={isLoading}
            styleType='outline'
            onClick={prevStep}
          >
            Go back
          </Button>
        ) : (
          <p className='mt-2 text-text-light-2 dark:text-text-dark-2 lg:text-lg'>
            Having problems?{' '}
            <Link
              to=''
              className='text-special-color font-semibold underline'
            >
              Get help
            </Link>
          </p>
        )}
      </footer>
    </form>
  );
};

export default ProjectsForm;
