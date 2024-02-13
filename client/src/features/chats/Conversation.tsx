import React from 'react';

import Message from './Message';
import { groupConsecutiveMessages } from '../../utils/groupMessages';
import { MessageType } from '../../types/chatTypes';

const Conversation = ({ messages }: { messages: MessageType[] | [] }) => {
  //Group by consecutive user messages
  const groupedMessagesByUser = groupConsecutiveMessages(messages);

  return (
    <ul className='flex-grow overflow-y-auto overflow-x-hidden'>
      {groupedMessagesByUser.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((msg, j) => (
            <Message
              key={msg._id}
              text={msg.content}
              sender={msg.sendBy}
              isFirstInGroup={j === 0}
              date={msg.createdAt!}
            />
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Conversation;
