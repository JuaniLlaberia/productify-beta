import SignupForm from '../features/authentication/SignupForm';

const SignupPage = () => {
  return (
    <>
      <header className='mb-4'>
        <h3 className='text-center mb-2 text-2xl lg:text-4xl font-semibold text-text-light-1 dark:text-text-dark-1'>
          Let's get started
        </h3>
        <p className='text-text-light-2 dark:text-text-dark-2 text-sm lg:text-base'>
          We just need some extra information and you can start using Productify
          features for free.
        </p>
      </header>
      <SignupForm />
    </>
  );
};

export default SignupPage;
