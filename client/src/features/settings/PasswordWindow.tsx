import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import SettingsWindow from './SettingsWindow';
import { useCreatePassword } from '../authentication/useCreatePassword';

const PasswordWindow = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createPassword, isLoading } = useCreatePassword();

  const handleSetPassword = handleSubmit(({ password, confirmedPassword }) => {
    createPassword(
      { password, confirmedPassword },
      {
        onSuccess: () => reset(),
      }
    );
  });

  return (
    <SettingsWindow title='Create Password'>
      <form
        onSubmit={handleSetPassword}
        className='mx-6 my-3 dark:bg-bg-dark-2 rounded-lg border border-border-light dark:border-border-dark'
      >
        <section className='py-4 px-6'>
          <h2 className='text-text-light-1 dark:text-text-dark-1 text-xl font-semibold mb-3'>
            Password
          </h2>
          <p className='text-sm lg:text-base text-text-light-2 dark:text-text-dark-2 mb-7'>
            Set a permanent password so you can login with your email and
            password. You can change it whenever you need.
          </p>
          <InputWrapper
            label='Password'
            errorMsg={errors?.password?.message as string}
          >
            <Input
              register={register('password', {
                required: 'Must provide a strong password',
              })}
              type='password'
              placeholder='••••••••••••'
            />
          </InputWrapper>
          <InputWrapper
            label='Confirm Password'
            errorMsg={errors?.confirmedPassword?.message as string}
          >
            <Input
              register={register('confirmedPassword', {
                required: 'Passwords must match',
              })}
              type='password'
              placeholder='••••••••••••'
            />
          </InputWrapper>
        </section>
        <footer className='flex items-center p-3 justify-end border-t border-border-light dark:border-border-dark'>
          <Button isLoading={isLoading}>Set new passwword</Button>
        </footer>
      </form>
    </SettingsWindow>
  );
};

export default PasswordWindow;
