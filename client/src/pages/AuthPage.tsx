import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi2';

import GoogleBtn from '../features/authentication/GoogleBtn';
import GithubBtn from '../features/authentication/GithubBtn';
import AuthForm from '../features/authentication/AuthForm';

const ProjectNew = () => {
  return (
    <>
      <header className='mb-3 lg:mb-7'>
        <h3 className='text-2xl lg:text-3xl font-semibold text-text-light-1 dark:text-text-dark-1'>
          Let's get Started
        </h3>
      </header>
      <section className='w-full'>
        <GoogleBtn />
        <GithubBtn />
      </section>
      <hr className='w-full border-border-light dark:border-border-dark my-4 lg:my-8' />
      <AuthForm />
      <footer className='flex justify-center mt-3 lg:mt-4'>
        <Link
          to='/login'
          className='flex items-center gap-1 text-special-color md:hover:underline'
        >
          Login With Password
          <HiOutlineArrowRight />
        </Link>
      </footer>
    </>
  );
};

export default ProjectNew;
