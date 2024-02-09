import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import UpdateProfileImg from './UpdateProfileImg';
import InputWrapper from '../../components/InputWrapper';
import SettingsWindow from './SettingsWindow';
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
    <SettingsWindow title='Account Information'>
      <UpdateProfileImg />
      <form onSubmit={handleUpdateUser}>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-2'>
          <InputWrapper label='First Name' errorMsg={errors.firstName?.message}>
            <Input
              type='text'
              register={register('firstName', {
                required: 'You must provide a first name',
              })}
              placeholder='John'
            />
          </InputWrapper>
          <InputWrapper label='Last Name' errorMsg={errors.lastName?.message}>
            <Input
              type='text'
              register={register('lastName', {
                required: 'You must provide a last name',
              })}
              placeholder='Doe'
            />
          </InputWrapper>
        </div>
        <InputWrapper label='Email' errorMsg={errors.email?.message}>
          <Input
            register={register('email')}
            type='email'
            disabled
            placeholder='example@gmail.com'
          />
        </InputWrapper>
        <div className='flex justify-end'>
          <Button isLoading={isLoading} className='w-full mt-2 lg:w-auto'>
            Save changes
          </Button>
        </div>
      </form>
    </SettingsWindow>
  );
};

export default UserInfoWindow;
