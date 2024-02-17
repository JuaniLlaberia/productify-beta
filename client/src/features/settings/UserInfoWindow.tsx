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
      <section className='mt-4 mx-6 border border-border-light dark:border-border-dark bg-bg-light-1 dark:bg-bg-dark-2 rounded-lg py-4 px-6'>
        <h2 className='font-semibold text-text-light-1 dark:text-text-dark-1 text-xl mb-3'>
          Email address
        </h2>
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
      </section>
      <form onSubmit={handleUpdateUser}>
        <section className='mt-4 mx-6 border border-border-light dark:border-border-dark bg-bg-light-1 dark:bg-bg-dark-2 rounded-lg py-4'>
          <h2 className='font-semibold text-text-light-1 dark:text-text-dark-1 text-xl mb-3 px-6'>
            Display name
          </h2>
          <div className=' pb-5 px-6'>
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
          <div className='flex items-center p-3 pb-0 justify-end border-t border-border-light dark:border-border-dark'>
            <Button isLoading={isLoading}>Save</Button>
          </div>
        </section>
      </form>
    </SettingsWindow>
  );
};

export default UserInfoWindow;
