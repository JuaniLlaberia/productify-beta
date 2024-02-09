import { NavLink } from 'react-router-dom';
import type { ReactElement } from 'react';

type SettingsItemType = {
  link?: string;
  fn?: () => void;
  label: string;
  icon: ReactElement;
};
const SettingsItem = ({ label, link, icon, fn }: SettingsItemType) => {
  return (
    <li className='rounded-lg hover:bg-bg-light-hover-2 transition-colors text-text-light-1 dark:text-text-dark-1'>
      {link ? (
        <NavLink
          id='settings-item'
          to={link}
          className='flex items-center gap-2 px-3 pl-4 py-1.5 overflow-hidden'
        >
          <span className='text-lg'>{icon}</span>
          {label}
        </NavLink>
      ) : (
        <button
          onClick={fn}
          className='flex items-center gap-2  px-3 pl-4 py-1.5'
        >
          <span className='text-lg'>{icon}</span>
          {label}
        </button>
      )}
    </li>
  );
};

export default SettingsItem;
