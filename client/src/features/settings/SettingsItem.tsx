import { NavLink } from 'react-router-dom';
import type { ReactElement } from 'react';

type SettingsItemType = {
  link: string;
  label: string;
  icon: ReactElement;
};
const SettingsItem = ({ label, link, icon }: SettingsItemType) => {
  return (
    <li className='rounded-lg hover:bg-bg-light-hover-2 transition-colors overflow-hidden'>
      <NavLink
        id='settings-item'
        to={link}
        className='flex items-center gap-2 px-3 pl-4  py-1.5 '
      >
        <span className='text-lg'>{icon}</span>
        {label}
      </NavLink>
    </li>
  );
};

export default SettingsItem;
