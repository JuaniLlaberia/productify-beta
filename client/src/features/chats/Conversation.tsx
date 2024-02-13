import { Fragment, RefObject, useMemo } from 'react';

import Message from './Message';
import { groupConsecutiveMessages } from '../../utils/groupMessages';
import { MessageType } from '../../types/chatTypes';
import { formatDate } from '../../utils/formatDate';
import { groupMessagesByDay } from '../../utils/groupMessagesByDate';

const Conversation = ({
  messages,
  scrollRef,
}: {
  messages: MessageType[] | [];
  scrollRef: RefObject<HTMLLIElement>;
}) => {
  const groupedMessages = useMemo(
    () =>
      groupMessagesByDay(messages).map(groupDay =>
        groupConsecutiveMessages(groupDay)
      ),
    [messages]
  );

  return (
    <ul className='flex flex-col flex-grow overflow-y-auto overflow-x-hidden lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover pt-2 pb-4'>
      {groupedMessages.map((date, i) => (
        <Fragment key={i}>
          <li className='flex items-center justify-center my-3'>
            <hr className='w-full border-border-light dark:border-border-dark' />
            <p className='px-3 text-text-light-2 dark:text-text-dark-2 text-xs'>
              {formatDate(new Date(date[0][0].createdAt!))}
            </p>
            <hr className='w-full  border-border-light dark:border-border-dark' />
          </li>
          {date.map((group, j) => (
            <Fragment key={j}>
              {group.map((msg, h) => (
                <Message
                  key={msg._id}
                  messageData={msg}
                  isFirstInGroup={h === 0}
                />
              ))}
            </Fragment>
          ))}
        </Fragment>
      ))}
      <li ref={scrollRef}></li>
    </ul>
  );
};

export default Conversation;
