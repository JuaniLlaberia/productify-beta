import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from '../authentication/useLogout';

const LogoutBtn = () => {
  const { logout, isLoading } = useLogout();

  return (
    <button
      onClick={() => logout()}
      aria-label='logout'
      disabled={isLoading}
      className='flex items-center gap-2 py-1.5 text-red-500 hover:text-red-400 active:text-red-600 transition-colors disabled:cursor-not-allowed'
    >
      <span className='text-xl'>
        <HiArrowRightOnRectangle />
      </span>
      <span className='text-[1.07rem]'>Log out</span>
    </button>
  );
};

export default LogoutBtn;
