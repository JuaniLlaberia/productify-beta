import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineAtSymbol,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineChevronDown,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from 'react-icons/hi2';

import Modal from '../../components/Modal';
import SidebarItem from './SidebarItem';
import NewPageForm from '../pages/NewPageForm';
import ConfirmationModal from '../../components/ConfirmationModal';
import MembersTable from './MembersTable';
import NewChatForm from '../chats/NewChatForm';
import ProjectInvitationForm from './ProjectInvitationForm';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useLeaveProject } from './useLeaveProject';
import { useDeleteProject } from './useDeleteProject';

type SidebarHeaderType = {
  name: string;
  isAdmin: boolean;
  isOwner: boolean;
};

const SidebarHeader = ({ name, isAdmin, isOwner }: SidebarHeaderType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { clickRef } = useClickOutside(() => setIsOpen(false));

  const { leaveProject, isLoading: isLeaving } = useLeaveProject();
  const { deleteProject, isLoading: isDeleting } = useDeleteProject();

  return (
    <header ref={clickRef}>
      <section
        onClick={() => setIsOpen(prev => !prev)}
        className='flex justify-between items-center p-3.5 mb-5 border-b border-border-dark cursor-pointer'
      >
        <h1 className='text-lg text-text-dark-2 font-semibold xl:text-xl'>
          {name}
        </h1>
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
                  {isAdmin ? (
                    <>
                      <SidebarItem
                        modalId='new-page-modal'
                        icon={<HiOutlinePlus />}
                        label='Add new board'
                      />
                      <SidebarItem
                        modalId='new-chat-modal'
                        icon={<HiOutlineChatBubbleLeftEllipsis />}
                        label='Create new chat'
                        separator
                      />
                      <SidebarItem
                        modalId='invites-modal'
                        icon={<HiOutlineAtSymbol />}
                        label='Invite user'
                      />
                    </>
                  ) : null}
                  <SidebarItem
                    modalId='members-modal'
                    icon={<HiOutlineUserGroup />}
                    label='Members'
                  />
                  {isOwner ? (
                    <SidebarItem
                      modalId='delete-modal'
                      icon={<HiOutlineTrash />}
                      label='Delete Project'
                      danger
                    />
                  ) : (
                    <SidebarItem
                      modalId='leave-modal'
                      icon={<HiOutlineArrowRightOnRectangle />}
                      label='Leave Project'
                      danger
                    />
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Modal.Window
          windowId='new-page-modal'
          title='Create board'
          removeCloseBtn
        >
          <NewPageForm />
        </Modal.Window>
        <Modal.Window
          windowId='new-chat-modal'
          title='Create project chat'
        >
          <NewChatForm />
        </Modal.Window>
        <Modal.Window
          windowId='invites-modal'
          title='Invite new members'
          removeCloseBtn
        >
          <ProjectInvitationForm />
        </Modal.Window>
        <Modal.Window
          windowId='members-modal'
          title='Project Members'
        >
          <MembersTable />
        </Modal.Window>
        <Modal.Window
          windowId='leave-modal'
          title='Leave Project'
          removeCloseBtn
        >
          <ConfirmationModal
            isLoading={isLeaving}
            message={`You will lose all access to this project and it's data. You can re-join
            with a new invitation.`}
            action={leaveProject}
          />
        </Modal.Window>
        <Modal.Window
          windowId='delete-modal'
          title='Delete Project'
          removeCloseBtn
        >
          <ConfirmationModal
            isLoading={isDeleting}
            message={`This project will be deleted with all of its information, pages and stored data.`}
            action={deleteProject}
          />
        </Modal.Window>
      </Modal>
    </header>
  );
};

export default SidebarHeader;
