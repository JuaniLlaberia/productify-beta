import { Link } from 'react-router-dom';

import GoogleBtn from '../features/authentication/GoogleBtn';
import GithubBtn from '../features/authentication/GithubBtn';
import AuthForm from '../features/authentication/AuthForm';

const ProjectNew = () => {
  return (
    <>
      <header className='mb-3 lg:mb-7'>
        <h3 className='text-2xl lg:text-3xl font-semibold'>
          Let's get Started
        </h3>
      </header>
      <section className='w-full'>
        <GoogleBtn />
        <GithubBtn />
      </section>
      <hr className='w-full border-border-light my-4 lg:my-10' />
      <AuthForm />
      <p className='text-sm text-text-light-2 mt-2 lg:mt-4 lg:text-base 2xl:text-lg'>
        Do you have a password?{' '}
        <span>
          <Link
            to='/login'
            className='text-special-color font-semibold underline'
          >
            Login with password
          </Link>
        </span>
      </p>
      <p className='text-sm text-text-light-2 mt-2 lg:text-base 2xl:text-lg'>
        Problems with your account?{' '}
        <span>
          <Link
            to='/'
            className='text-special-color font-semibold underline'
          >
            Support
          </Link>
        </span>
      </p>
    </>
  );
};

export default ProjectNew;
