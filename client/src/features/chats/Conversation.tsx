import React from 'react';
import Message from './Message';
import { groupConsecutiveMessages } from '../../utils/groupMessages';
import { MessageType } from '../../types/chatTypes';

const test: MessageType[] = [
  { _id: '1', content: 'Test 1 asdsa', sendBy: 'tom' },
  {
    _id: '2',
    content: 'sssssssssssssssssssssssssssssssssssssssssssssss',
    sendBy: 'tom',
  },
  { _id: '3', content: 'Test 3asd sad', sendBy: 'me' },
  { _id: '4', content: 'Test 4 asd', sendBy: 'tom' },
  { _id: '4', content: 'Test 4 asd', sendBy: 'tom' },
];

const Conversation = () => {
  //Fetch messages for chat
  //
  //Group by consecutive user messages
  const groupedMessagesByUser = groupConsecutiveMessages(test);

  return (
    <ul className='flex-grow overflow-y-auto overflow-x-hidden'>
      {groupedMessagesByUser.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((msg, j) => (
            <Message
              key={msg._id}
              text={msg.content}
              sender={msg.sendBy}
              isAuthSender={msg.sendBy === 'me'}
              isFirstInGroup={j === 0}
            />
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Conversation;
