import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

import Button from '../../components/Button';
import { useJoinProject } from './useJoinProject';

const JoinProjectComponent = () => {
  const { error, isLoading, joinProject } = useJoinProject();
  const navigate = useNavigate();

  useEffect(() => {
    joinProject();
  }, [joinProject]);

  return (
    <main className='flex justify-center items-center bg-bg-light-1 h-screen'>
      <header className='absolute top-0 py-6'>LOGO</header>
      <section className='flex flex-col items-center'>
        {isLoading ? (
          <>
            <ClipLoader
              size={50}
              color='black'
            />
            <p className='font-semibold text-text-light-1 mt-5'>
              Validating invitation
            </p>
          </>
        ) : null}
        {error ? (
          <>
            <h1 className='flex items-center gap-2 text-xl font-semibold'>
              <span className='text-4xl text-red-400'>
                <HiOutlineExclamationTriangle />
              </span>
              Couldn't join project
            </h1>
            <p className='text-text-light-2 opacity-85 mb-6'>
              {error?.message}
            </p>
            <Button onClick={() => navigate('/home')}>Go home</Button>
          </>
        ) : null}
      </section>
    </main>
  );
};

export default JoinProjectComponent;
