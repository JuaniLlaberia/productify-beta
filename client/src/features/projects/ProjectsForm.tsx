import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import ProjectNameStep from './ProjectNameStep';
import ProjectImgStep from './ProjectImgStep';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';

const ProjectsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { crrStep, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm([
      <ProjectNameStep
        nameError={errors?.projectName?.message as string}
        register={register}
      />,
      <ProjectImgStep />,
    ]);

  const handleProjectCreation = handleSubmit(data => {
    if (!isLastStep) return nextStep();

    console.log(data);
  });

  return (
    <>
      <h3 className='text-center text-xl mb-1 font-semibold'>
        Create a project
      </h3>
      <form onSubmit={handleProjectCreation} className='flex flex-col'>
        <section className='min-h-[160px]'>{crrStep}</section>
        <Button rounded>{isLastStep ? 'Finish' : 'Next'}</Button>
        <footer className='flex justify-center items-center'>
          {!isFirstStep ? (
            <button
              onClick={prevStep}
              className='mt-2 text-m text-text-light-2'
            >
              Go back
            </button>
          ) : (
            <p className='mt-2 text text-text-light-2'>
              Can't create a project?{' '}
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
    </>
  );
};

export default ProjectsForm;
