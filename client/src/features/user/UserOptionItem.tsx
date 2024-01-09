import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';

type OptionsType = {
  icon: ReactElement;
  label: string;
  link: string;
};

const UserOptionItem = ({ icon, label, link }: OptionsType) => {
  return (
    <li className='py-1.5 text-text-light-1 dark:text-text-dark-1 hover:text-text-light-2 dark:hover:text-text-dark-2 transition-colors'>
      <Link to={link} className='flex items-center gap-2'>
        <span className='text-xl'>{icon}</span>
        <span className='text-[1.07rem]'>{label}</span>
      </Link>
    </li>
  );
};

export default UserOptionItem;
