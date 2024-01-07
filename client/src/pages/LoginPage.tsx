import { Link } from 'react-router-dom';
import LoginForm from '../features/authentication/LoginForm';

const LoginPage = () => {
  return (
    <>
      <header className='mb-3'>
        <h3 className='text-start text-3xl lg:text-4xl font-semibold'>
          Welcome back
        </h3>
      </header>
      <LoginForm />
      <p className='text-sm text-text-light-2 mt-2 lg:text-base 2xl:text-lg'>
        Log in using email and code?{' '}
        <span>
          <Link
            to='/auth'
            className='text-special-color font-semibold underline'
          >
            Click here
          </Link>
        </span>
      </p>
    </>
  );
};

export default LoginPage;
