import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';

type OptionsType = {
  icon: ReactElement;
  label: string;
  link: string;
  onClose: () => void;
};

const UserOptionItem = ({ icon, label, link, onClose }: OptionsType) => {
  return (
    <li
      onClick={onClose}
      className='py-1.5 text-text-dark-1 transition-colors px-2 rounded-lg md:hover:text-text-dark-2 md:hover:bg-bg-dark-3'
    >
      <Link
        to={link}
        className='flex items-center gap-2'
      >
        <span className='text-xl'>{icon}</span>
        <span className='text-[1.07rem]'>{label}</span>
      </Link>
    </li>
  );
};

export default UserOptionItem;
