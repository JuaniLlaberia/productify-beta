import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../components/Input';
import EmojiMenu from '../../components/EmojiMenu';
import { useProjectContext } from '../../context/ProjectContext';
import { useUserContext } from '../../context/UserContext';
import { MessageType } from '../../types/chatTypes';

const MessageInput = ({
  ws,
  setMessages,
  scrollRef,
}: {
  ws: WebSocket;
  setMessages: Dispatch<SetStateAction<MessageType[] | []>>;
  scrollRef: RefObject<HTMLLIElement>;
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
      sendBy: {
        _id: user?.data?._id,
        firstName: user?.data?.firstName,
        profileImg: user?.data?.profileImg,
      },
    };

    //Sending message information to server
    ws.send(
      JSON.stringify({
        ...messageObj,
        recipients: chatInfo.members.filter(
          member => member !== user?.data?._id
        ),
      })
    );

    //Resetting input
    setMessage('');

    //@ts-ignore
    setMessages(prev => [...prev, { ...messageObj, createdAt: Date.now() }]);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }, 1);
  };

  return (
    <div className='flex items-center gap-3'>
      <EmojiMenu setValue={setMessage} />
      <form
        className='relative w-full'
        onSubmit={handleSendMessage}
      >
        <Input
          type='text'
          placeholder='Send message...'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className='absolute top-[50%] translate-y-[-50%] right-4 font-semibold text-sm lg:text-base text-text-light-1 dark:text-text-dark-1'>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
