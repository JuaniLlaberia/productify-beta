import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineAtSymbol,
  HiOutlineChevronDown,
  HiOutlinePlus,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from 'react-icons/hi2';

import Modal from '../../components/Modal';
import SidebarItem from './SidebarItem';
import { useClickOutside } from '../../hooks/useClickOutside';
import NewPageForm from '../pages/NewPageForm';

const SidebarHeader = ({
  name,
  isAdmin,
}: {
  name: string;
  isAdmin: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { clickRef } = useClickOutside(() => setIsOpen(false));

  return (
    <header ref={clickRef}>
      <section
        onClick={() => setIsOpen(prev => !prev)}
        className='flex justify-between items-center p-3.5 mb-5 border-b border-border-dark cursor-pointer'
      >
        <h1 className='text-lg text-text-dark-2 font-semibold'>{name}</h1>
        <button className='text-text-dark-2'>
          {isOpen ? (
            <HiOutlineXMark size={18} />
          ) : (
            <HiOutlineChevronDown size={18} />
          )}
        </button>
      </section>
      <Modal>
        <div className='relative mx-4'>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key='user-profile-modal'
                initial={{ scale: 0.95, opacity: 0.1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className='absolute w-full z-50 bg-bg-dark-1 border border-border-dark -top-3 rounded-md overflow-hidden'
              >
                <ul onClick={() => setIsOpen(false)}>
                  <SidebarItem
                    modalId='new-page-modal'
                    icon={<HiOutlinePlus />}
                    label='Add new page'
                    isAdmin={isAdmin}
                  />
                  <SidebarItem
                    modalId='members-modal'
                    icon={<HiOutlineUserGroup />}
                    label='Members'
                    isAdmin={true}
                  />
                  <SidebarItem
                    modalId='invites-modal'
                    icon={<HiOutlineAtSymbol />}
                    label='Invite user'
                    isAdmin={isAdmin}
                  />
                  <SidebarItem
                    modalId='leave-modal'
                    icon={<HiOutlineArrowRightOnRectangle />}
                    label='Leave Project'
                    isAdmin={true}
                    danger
                  />
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Modal.Window
          windowId='new-page-modal'
          title='Create project pages'
        >
          <NewPageForm />
        </Modal.Window>
      </Modal>
    </header>
  );
};

export default SidebarHeader;
