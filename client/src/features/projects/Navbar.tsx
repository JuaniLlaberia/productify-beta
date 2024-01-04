import { useUserContext } from '../../context/UserContext';

const Navbar = () => {
  const { user } = useUserContext();

  return (
    <nav className='h-20 flex justify-end items-center px-6'>
      <div className='bg-gray-400 w-12 h-12 rounded-full'></div>
    </nav>
  );
};

export default Navbar;
