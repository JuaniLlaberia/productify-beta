import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLoginPassword } from './useLoginPassword';
import InputWrapper from '../../components/InputWrapper';

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
      <InputWrapper
        label='Email Address'
        errorMsg={errors?.email?.message as string}
      >
        <Input
          register={register('email', {
            required: 'Missing account email',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          placeholder='example@gmail.com'
          icon={<HiOutlineEnvelope />}
        />
      </InputWrapper>
      <InputWrapper
        label='Password'
        errorMsg={errors?.password?.message as string}
      >
        <Input
          register={register('password', {
            required: 'Missing password',
          })}
          type='password'
          placeholder='••••••••••••'
          icon={<HiOutlineLockClosed />}
        />
      </InputWrapper>
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
