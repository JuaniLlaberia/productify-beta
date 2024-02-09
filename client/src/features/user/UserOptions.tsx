import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineFolder,
  HiOutlineShieldExclamation,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import UserOptionItem from './UserOptionItem';
import { DropdownMenuSeparator } from '../../components/DropdownMenu';
import { useLogout } from '../authentication/useLogout';

const options = [
  {
    icon: <HiOutlineFolder />,
    label: 'My projects',
    link: '/home',
  },
  {
    icon: <HiOutlineCog6Tooth />,
    label: 'User settings',
    link: '/settings',
  },
  {
    icon: <HiOutlineShieldExclamation />,
    label: 'Support',
    link: '/home',
  },
];

const UserOptions = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <ul className='flex flex-col'>
      {/* Navigation options */}
      {options.map(opt => (
        <UserOptionItem
          key={opt.label}
          icon={opt.icon}
          label={opt.label}
          action={() => navigate(opt.link)}
        />
      ))}
      <DropdownMenuSeparator />
      {/* Log out button */}
      <UserOptionItem
        danger
        icon={<HiOutlineArrowRightOnRectangle />}
        label='Log Out'
        action={() => logout()}
      />
    </ul>
  );
};

export default UserOptions;
