import type { ReactElement } from 'react';
import type { IconType } from 'react-icons';

import Modal from '../../components/Modal';

const SidebarItem = ({
  icon,
  label,
  isAdmin,
  danger,
  modalId,
}: {
  icon: ReactElement<IconType>;
  label: string;
  modalId: string;
  danger?: boolean;
  isAdmin?: boolean;
}) => {
  if (!isAdmin) return null;

  return (
    <li
      className={`${
        !danger
          ? 'text-text-dark-1 md:hover:text-text-dark-2'
          : 'text-red-400 md:hover:text-red-500'
      }  py-2 px-6 border-border-dark md:hover:bg-bg-dark-3 cursor-pointer transition-colors last:border-t first:border-b`}
    >
      <Modal.Open windowId={modalId}>
        <p className='flex items-center gap-3'>
          <span className='text-xl'>{icon}</span>
          {label}
        </p>
      </Modal.Open>
    </li>
  );
};

export default SidebarItem;
