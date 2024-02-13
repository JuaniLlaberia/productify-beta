import UserOptions from './UserOptions';
import { useUserContext } from '../../context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';

const UserDropdownProfile = () => {
  const { user: userData } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={userData?.data?.profileImg}
          className='w-10 h-10 lg:w-12 lg:h-12 rounded-2xl border border-border-light dark:border-border-dark'
          draggable={false}
          alt='profile photo'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-bg-light-contrast py-2 px-3 border-border-dark'>
        <section className='flex items-center gap-2 py-3'>
          <img
            src={userData?.data?.profileImg}
            className='w-14 h-14 rounded-2xl border border-border-dark'
            draggable={false}
            alt='profile photo'
          />
          <div>
            <h2 className='text-sm text-text-dark-1 font-semibold'>
              {userData?.data?.firstName} {userData?.data?.lastName}
            </h2>
            <p className='text-xs text-text-dark-2'>{userData?.data?.email}</p>
          </div>
        </section>
        <DropdownMenuSeparator />
        <UserOptions />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownProfile;
