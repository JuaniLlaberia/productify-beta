import type { ReactElement } from 'react';
import type { IconType } from 'react-icons';

import Modal from '../../components/Modal';

const SidebarItem = ({
  icon,
  label,
  danger,
  modalId,
  separator,
}: {
  icon: ReactElement<IconType>;
  label: string;
  modalId: string;
  danger?: boolean;
  isAdmin?: boolean;
  separator?: boolean;
}) => {
  return (
    <Modal.Open windowId={modalId}>
      <li
        className={`${
          !danger
            ? 'text-text-dark-1 md:hover:text-text-dark-2'
            : 'text-red-400 md:hover:text-red-500'
        }  py-2 px-6 border-border-dark md:hover:bg-bg-dark-3 cursor-pointer transition-colors last:border-t ${
          separator ? 'border-b' : ''
        }`}
      >
        <p className='flex items-center gap-3'>
          <span className='text-lg'>{icon}</span>
          {label}
        </p>
      </li>
    </Modal.Open>
  );
};

export default SidebarItem;
