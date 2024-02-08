import type { ReactElement } from 'react';
import { DropdownMenuItem } from '../../components/DropdownMenu';

type OptionsType = {
  icon: ReactElement;
  label: string;
  danger?: boolean;
  action: () => void;
};

const UserOptionItem = ({ icon, label, danger, action }: OptionsType) => {
  return (
    <li className='dark'>
      <DropdownMenuItem
        onClick={action}
        icon={icon}
        className={`py-1.5 ${
          danger ? 'text-red-500' : 'text-text-dark-1 hover:text-text-dark-2'
        } transition-colors px-2 rounded-md`}
      >
        {label}
      </DropdownMenuItem>
    </li>
  );
};

export default UserOptionItem;
