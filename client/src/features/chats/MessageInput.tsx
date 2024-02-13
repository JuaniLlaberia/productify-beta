import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../components/Input';
import { useProjectContext } from '../../context/ProjectContext';
import { useUserContext } from '../../context/UserContext';
import { MessageType } from '../../types/chatTypes';

const MessageInput = ({
  ws,
  setMessages,
}: {
  ws: WebSocket;
  setMessages: Dispatch<SetStateAction<MessageType[] | []>>;
}) => {
  const { chatId } = useParams();
  const { user } = useUserContext();
  const { projectData } = useProjectContext();

  const chatInfo = projectData.chats.filter(chat => chat._id === chatId)[0];

  const [message, setMessage] = useState('');

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    //Check if input is empty or not
    if (message.trim() === '') return;

    const messageObj = {
      content: message.trim(),
      chatId,
      sendBy: user?.data?._id,
      recipients: chatInfo.members.filter(member => member !== user?.data?._id),
    };

    //Sending message information to server
    ws.send(JSON.stringify(messageObj));

    //Resetting input
    setMessage('');
    setMessages(prev => [
      ...prev,
      {
        ...messageObj,
        sendBy: { _id: user?.data?._id, firstName: user?.data?.firstName },
        createdAt: Date.now(),
      },
    ]);
  };

  return (
    <form
      className='relative w-full'
      onSubmit={handleSendMessage}
    >
      <Input
        placeholder='Send message...'
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button className='absolute top-[50%] translate-y-[-50%] right-4 font-semibold text-sm lg:text-base'>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
