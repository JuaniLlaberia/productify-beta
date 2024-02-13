import { useEffect, useState } from 'react';

import ChatHeader from './ChatHeader';
import Conversation from './Conversation';
import MessageInput from './MessageInput';
import { useGetMessages } from './useGetMessages';
import { MessageType } from '../../types/chatTypes';

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const { messages: messagesDB, isLoading } = useGetMessages();

  const handleMessage = (e: MessageEvent) => {
    const messageData = JSON.parse(e.data);
    setMessages(prev => [...prev, messageData]);
  };

  useEffect(() => {
    //Stablizing websocket connection with our server
    const ws = new WebSocket('ws://localhost:8000');
    //Storing our websocket so we can access to it easier
    setWs(ws);

    ws.addEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setMessages(prev => [...messagesDB!, ...prev]);
      console.log(messagesDB);
    }
  }, [messagesDB, isLoading]);

  return (
    <section className='w-full h-full flex flex-col'>
      <ChatHeader />
      <Conversation messages={messages} />
      <MessageInput
        ws={ws!}
        setMessages={setMessages}
      />
    </section>
  );
};

export default Chat;
