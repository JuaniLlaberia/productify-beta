import { HiOutlineBars3 } from 'react-icons/hi2';

import UserDropdownProfile from '../features/user/UserDropdownProfile';

const Navbar = ({ toggleMenu }: { toggleMenu?: () => void }) => {
  return (
    <nav
      className={`sticky top-0 z-90 flex ${
        toggleMenu ? 'justify-between' : 'justify-end'
      } lg:justify-end
       items-center px-3 py-2 bg-bg-light-1 dark:bg-bg-dark-1`}
    >
      {toggleMenu ? (
        <div className='flex gap-5'>
          <button
            className='lg:hidden text-text-light-1 dark:text-text-dark-1'
            onClick={toggleMenu}
            aria-label='Open sidebar'
          >
            <HiOutlineBars3 size={25} />
          </button>
        </div>
      ) : null}

      <UserDropdownProfile />
    </nav>
  );
};

export default Navbar;
