import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import UpdateProfileImg from './UpdateProfileImg';
import InputWrapper from '../../components/InputWrapper';
import { useUserContext } from '../../context/UserContext';
import { useUpdateUser } from '../user/useUpdateUser';

const UserInfoWindow = () => {
  const { user } = useUserContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: user?.data?.firstName,
      lastName: user?.data?.lastName,
      email: user?.data?.email,
    },
  });

  const { updateMe, isLoading } = useUpdateUser();

  const handleUpdateUser = handleSubmit(({ firstName, lastName }) => {
    if (!firstName || !lastName) return;

    updateMe({ firstName, lastName });
  });

  return (
    <>
      <h2 className='my-1 px-3 text-2xl text-text-light-1 dark:text-text-dark-1 font-semibold'>
        Account
      </h2>
      <UpdateProfileImg />
      <form
        onSubmit={handleUpdateUser}
        className='w-full px-5 mb-3'
      >
        <div className='grid grid-cols-2 gap-3'>
          <InputWrapper
            label='First Name'
            errorMsg={errors.firstName?.message}
          >
            <Input
              type='text'
              register={register('firstName', {
                required: 'You must provide a first name',
              })}
              placeholder='John'
            />
          </InputWrapper>
          <InputWrapper
            label='Last Name'
            errorMsg={errors.lastName?.message}
          >
            <Input
              type='text'
              register={register('lastName', {
                required: 'You must provide a last name',
              })}
              placeholder='Doe'
            />
          </InputWrapper>
        </div>
        <InputWrapper
          label='Email'
          errorMsg={errors.email?.message}
        >
          <Input
            register={register('email')}
            type='email'
            disabled
            placeholder='example@gmail.com'
          />
        </InputWrapper>
        <div className='flex justify-end my-2'>
          <Button isLoading={isLoading}>Save changes</Button>
        </div>
      </form>
    </>
  );
};

export default UserInfoWindow;
