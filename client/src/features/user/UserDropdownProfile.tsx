import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import user from '/user.jpg';
import UserOptions from './UserOptions';
import { useUserContext } from '../../context/UserContext';
import { useClickOutside } from '../../hooks/useClickOutside';

const UserDropdownProfile = () => {
  const { user: userData } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const { clickRef } = useClickOutside(() => setIsOpen(false));

  return (
    <div className='relative' ref={clickRef}>
      <img
        src={user}
        onClick={() => setIsOpen(prev => (prev ? false : true))}
        className='w-12 h-12 lg:w-14 lg:h-14 rounded-full cursor-pointer border border-border-light dark:border-border-dark'
        draggable={false}
        alt='profile photo'
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='user-profile-modal'
            initial={{ scale: 0.95, opacity: 0.1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='absolute z-[100] bg-bg-light-3 dark:bg-bg-dark-3 border border-border-light dark:border-border-dark top-14 lg:top-16 right-0 p-6 px-10 rounded-md'
          >
            <header className='flex flex-col items-center'>
              <img
                src={user}
                className='w-20 h-20 lg:w-24 lg:h-24 rounded-full mb-3 border border-border-light dark:border-border-dark'
                draggable={false}
                alt='profile photo'
              />
              <h2 className='text-lg text-text-light-1 dark:text-bg-dark-1 font-semibold'>
                {userData?.data?.fullName}
              </h2>
              <p className='text-base text-text-light-2 dark:text-text-dark-2'>
                {userData?.data?.email}
              </p>
            </header>
            <UserOptions />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdownProfile;
