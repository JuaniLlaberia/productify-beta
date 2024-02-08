import { useState } from 'react';
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronRight,
  HiOutlineHashtag,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

import { useUserContext } from '../../context/UserContext';
import { ChatType } from '../../types/projectTypes';

const PageChatItem = ({ chats }: { chats: ChatType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();

  const chatsToRender = chats?.filter(chat =>
    chat.members.includes(user?.data?._id!)
  );

  return (
    <>
      <li
        onClick={() => setIsOpen(prev => !prev)}
        className='flex items-center justify-between px-1 py-1.5 text-text-dark-1 cursor-pointer md:hover:bg-bg-dark-3 md:hover:rounded-md'
      >
        <h3 className='flex items-center gap-2 lg:gap-3'>
          <span className='text-lg lg:text-xl'>
            <HiOutlineChatBubbleLeftRight />
          </span>
          <span>Chats</span>
        </h3>
        <span className={`${isOpen ? 'rotate-90' : ''} transition-transform`}>
          <HiOutlineChevronRight size={17} />
        </span>
      </li>
      {isOpen ? (
        chatsToRender?.length > 0 ? (
          <ul className='pl-5'>
            {chatsToRender?.map(chat => (
              <li className='md:hover:bg-bg-dark-3 md:hover:rounded-md'>
                <NavLink
                  to={`chats/${chat._id}`}
                  className='flex items-center gap-1 text-text-dark-2 opacity-80'
                >
                  <HiOutlineHashtag />
                  <span>{chat.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className='px-3 text-sm text-text-dark-2 opacity-60'>
            No chats available
          </p>
        )
      ) : null}
    </>
  );
};

export default PageChatItem;
