import UserDropdownProfile from '../features/user/UserDropdownProfile';

const Navbar = () => {
  return (
    <nav className='h-20 flex justify-end items-center px-6 py-3'>
      <UserDropdownProfile />
    </nav>
  );
};

export default Navbar;
