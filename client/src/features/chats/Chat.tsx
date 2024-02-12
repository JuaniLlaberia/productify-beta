import ChatHeader from './ChatHeader';
import Conversation from './Conversation';
import MessageInput from './MessageInput';

const Chat = () => {
  return (
    <section className='w-full h-full flex flex-col'>
      <ChatHeader />
      <Conversation />
      <MessageInput />
    </section>
  );
};

export default Chat;
