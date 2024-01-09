import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLoginPassword } from './useLoginPassword';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLoading } = useLoginPassword();

  const handleLogin = handleSubmit(({ email, password }) => {
    login({ email, password });
  });

  return (
    <form
      className='w-full'
      onSubmit={handleLogin}
    >
      <Input
        register={register('email', {
          required: 'Missing account email',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        })}
        label='Email Address'
        placeholder='example@gmail.com'
        icon={<HiOutlineEnvelope />}
        errorMsg={errors?.email?.message as string}
      />
      <Input
        register={register('password', {
          required: 'Missing password',
        })}
        type='password'
        label='Password'
        placeholder='••••••••••••'
        icon={<HiOutlineLockClosed />}
        errorMsg={errors?.password?.message as string}
      />
      <Button
        full
        isLoading={isLoading}
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
