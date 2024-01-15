import { HiOutlineBars3 } from 'react-icons/hi2';
import UserDropdownProfile from '../features/user/UserDropdownProfile';

const Navbar = ({ toggleMenu }: { toggleMenu?: () => void }) => {
  return (
    <nav
      className={`sticky top-0 z-40 flex ${
        toggleMenu ? 'justify-between' : 'justify-end'
      } lg:justify-end
       items-center px-6 py-3 bg-bg-light-1`}
    >
      {toggleMenu ? (
        <button
          className='lg:hidden'
          onClick={toggleMenu}
        >
          <HiOutlineBars3 size={25} />
        </button>
      ) : null}

      <UserDropdownProfile />
    </nav>
  );
};

export default Navbar;
