import { Link } from 'react-router-dom';
import UserDropdownProfile from '../features/user/UserDropdownProfile';

const Navbar = ({ includeLogo }: { includeLogo?: boolean }) => {
  return (
    <nav
      className={`h-20 flex ${
        includeLogo ? 'justify-between' : 'justify-end'
      } items-center px-6 py-3`}
    >
      <Link to='/home'>{includeLogo ? 'LOGO' : null}</Link>
      <UserDropdownProfile />
    </nav>
  );
};

export default Navbar;
