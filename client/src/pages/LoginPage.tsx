import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import LoginForm from '../features/authentication/LoginForm';

const LoginPage = () => {
  return (
    <>
      <header className='mb-3'>
        <h3 className='text-start text-3xl lg:text-4xl font-semibold text-text-light-1 dark:text-text-dark-1'>
          Welcome back
        </h3>
      </header>
      <LoginForm />
      <footer className='flex justify-center mt-3 lg:mt-4'>
        <Link
          to='/auth'
          className='flex items-center gap-1 text-special-color md:hover:underline'
        >
          <HiOutlineArrowLeft /> Other Login Methods
        </Link>
      </footer>
    </>
  );
};

export default LoginPage;
