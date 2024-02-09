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
      <form onSubmit={handleSetPassword} className='mt-4 px-3'>
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
        <div className='flex justify-end my-4'>
          <Button isLoading={isLoading} className='w-full lg:w-auto'>
            Set new password
          </Button>
        </div>
      </form>
    </SettingsWindow>
  );
};

export default PasswordWindow;
