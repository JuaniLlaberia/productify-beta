import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import InputWrapper from '../../components/InputWrapper';
import { useUpdateUser } from '../user/useUpdateUser';
import { useUserContext } from '../../context/UserContext';

const SignupForm = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updateMe, isLoading } = useUpdateUser();

  const handleSignup = handleSubmit(({ firstName, lastName }) => {
    updateMe(
      { firstName, lastName, isNewUser: false },
      {
        onSuccess: () => {
          navigate('/home');
        },
      }
    );
  });

  //Protecting this 'private route'
  useEffect(() => {
    if (user?.status === 'failed') return navigate('/');
    if (user?.status === 'success' && !user?.data?.isNewUser)
      return navigate('/home');
  }, [user, navigate]);

  return (
    <form
      className='w-full'
      onSubmit={handleSignup}
    >
      <InputWrapper
        label='First Name'
        errorMsg={errors?.firstName?.message as string}
      >
        <Input
          register={register('firstName', {
            required: 'Missing account first name',
          })}
          placeholder='John'
          type='text'
        />
      </InputWrapper>
      <InputWrapper
        label='Last Name'
        errorMsg={errors?.firstName?.message as string}
      >
        <Input
          register={register('lastName', {
            required: 'Missing account last name',
          })}
          placeholder='Doe'
          type='text'
        />
      </InputWrapper>

      <Button
        className='mt-4'
        full
        isLoading={isLoading}
      >
        Create account
      </Button>
    </form>
  );
};

export default SignupForm;
