import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import UpdateProfileImg from './UpdateProfileImg';
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
      <UpdateProfileImg />
      <form
        onSubmit={handleUpdateUser}
        className='w-full px-5 mb-3'
      >
        <div className='grid grid-cols-2 gap-3'>
          <Input
            type='text'
            register={register('firstName', {
              required: 'You must provide a first name',
            })}
            label='First Name'
            placeholder='John'
            errorMsg={errors.firstName?.message}
          />
          <Input
            type='text'
            register={register('lastName', {
              required: 'You must provide a last name',
            })}
            label='Last Name'
            placeholder='Doe'
            errorMsg={errors.lastName?.message}
          />
        </div>
        <Input
          register={register('email')}
          type='email'
          disabled
          label='Email'
          placeholder='example@gmail.com'
          errorMsg={errors.email?.message}
        />
        <div className='flex justify-end my-2'>
          <Button isLoading={isLoading}>Save changes</Button>
        </div>
      </form>
    </>
  );
};

export default UserInfoWindow;
