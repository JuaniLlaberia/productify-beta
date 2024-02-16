import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Logo from '../components/Logo';

const ErrorPage = ({ type }: { type: 'error' | 'notfound' }) => {
  const navigate = useNavigate();

  return (
    <main className='h-screen flex flex-col gap-4 justify-center items-center bg-bg-light-2 dark:bg-bg-dark-2'>
      <Logo
        className='absolute top-1'
        onClick={() => navigate(-1)}
      />
      {type === 'notfound' ? (
        <section className='flex justify-center items-center gap-2'>
          <p className='font-semibold text-xl text-text-light-1 dark:text-text-dark-1'>
            404
          </p>
          <div className='h-10 w-[1px] bg-border-light dark:bg-border-dark'></div>
          <p className='text-text-light-2 dark:text-text-dark-2'>
            This page could not be found
          </p>
        </section>
      ) : (
        <section className='flex flex-col justify-center items-center gap-2 max-w-[80vw]'>
          <h2 className='font-semibold text-xl text-text-light-1 dark:text-text-dark-1'>
            Something went wrong
          </h2>
          <p className='text-text-light-2 dark:text-text-dark-2'>
            Please try going to the previous page or reloading the application.
            We apologies.
          </p>
        </section>
      )}
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </main>
  );
};

export default ErrorPage;
