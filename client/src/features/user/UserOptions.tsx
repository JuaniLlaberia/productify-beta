import {
  HiOutlineCog6Tooth,
  HiOutlineFolder,
  HiOutlineShieldExclamation,
} from 'react-icons/hi2';

import UserOptionItem from './UserOptionItem';
import LogoutBtn from './LogoutBtn';

const options = [
  {
    icon: <HiOutlineFolder />,
    label: 'My projects',
    link: '/home',
  },
  {
    icon: <HiOutlineCog6Tooth />,
    label: 'User settings',
    link: '/settings/user',
  },
  {
    icon: <HiOutlineShieldExclamation />,
    label: 'Support',
    link: '/home',
  },
];

const UserOptions = ({ onClose }: { onClose: () => void }) => {
  return (
    <ul className='flex flex-col mt-6'>
      {options.map(opt => (
        <UserOptionItem
          onClose={onClose}
          key={opt.label}
          icon={opt.icon}
          label={opt.label}
          link={opt.link}
        />
      ))}
      <li>
        <LogoutBtn />
      </li>
    </ul>
  );
};

export default UserOptions;
