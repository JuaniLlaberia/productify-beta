import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  HiOutlineEllipsisVertical,
  HiOutlineRocketLaunch,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { useClickOutside } from '../../hooks/useClickOutside';
import { useDeleteUserFromProject } from './useDeleteUserFromProject';
import { useUserContext } from '../../context/UserContext';
import { useToggleAdmin } from './useToggleAdmin';

type UserPreviewType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  authIsAdmin: boolean;
  img?: string;
};

const MembersRow = ({
  name,
  email,
  _id,
  img,
  isAdmin,
  authIsAdmin,
}: UserPreviewType) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUserContext();
  const { clickRef } = useClickOutside(() => setIsOpen(false));
  const { deleteUser, isLoading } = useDeleteUserFromProject();
  const { toggleAdmin, isLoading: isLoadingAdmin } = useToggleAdmin();

  return (
    <tr className='relative bg-transparent border-b flex justify-between items-center py-8 dark:hover:bg-gray-600 max-h-[40px]'>
      <th
        scope='row'
        className='flex gap-3 items-center px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        <p className='w-8 h-8 bg-special-color rounded-full flex items-center justify-center text-white font-semibold'>
          J
        </p>
        <p className='flex flex-col justify-center items-start gap-0.5'>
          <span>{name === 'undefined undefined' ? email : name}</span>
          <span className='text-xs text-text-light-2 opacity-80'>{email}</span>
        </p>
      </th>

      {_id !== user?.data?._id && authIsAdmin ? (
        <div ref={clickRef}>
          <button
            onClick={() => setIsOpen(prev => (prev ? false : true))}
            className='font-medium text-text-light-2 dark:text-blue-500'
          >
            <HiOutlineEllipsisVertical size={22} />
          </button>
          <AnimatePresence>
            {isOpen ? (
              <motion.ul
                initial={{ scale: 0.8, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className='absolute right-0 -bottom-9 z-20 bg-bg-light-1 px-2 py-1 rounded-md border border-border-light'
              >
                <li>
                  <button
                    disabled={isLoading || isLoadingAdmin}
                    onClick={() =>
                      toggleAdmin(
                        { userId: _id },
                        { onSuccess: () => setIsOpen(false) }
                      )
                    }
                    className='flex items-center gap-2 text-text-light-2 mb-1.5'
                  >
                    <HiOutlineRocketLaunch size={16} />{' '}
                    <span className='font-medium'>
                      {isAdmin ? 'Remove admin' : 'Make admin'}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    disabled={isLoading || isLoadingAdmin}
                    onClick={() =>
                      deleteUser(
                        { userId: _id },
                        { onSuccess: () => setIsOpen(false) }
                      )
                    }
                    className='flex items-center gap-2 text-red-500'
                  >
                    <HiOutlineTrash size={16} />{' '}
                    <span className='font-medium'>Remove user</span>
                  </button>
                </li>
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </tr>
  );
};

export default MembersRow;
