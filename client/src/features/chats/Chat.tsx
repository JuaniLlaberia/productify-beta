import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatHeader from './ChatHeader';
import Conversation from './Conversation';
import SkeletonChat from '../../components/skeletons/SkeletonChat';
import MessageInput from './MessageInput';
import { useGetMessages } from './useGetMessages';
import { MessageType } from '../../types/chatTypes';

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollRef = useRef<HTMLLIElement>(null);
  const { chatId } = useParams();

  //Fetch messages from DB
  const { messages: messagesDB, isLoading } = useGetMessages();

  const handleMessage = (e: MessageEvent) => {
    const messageData = JSON.parse(e.data);
    setMessages(prev => [...prev, messageData]);
  };

  useEffect(() => {
    setMessages([]);
  }, [chatId]);

  useEffect(() => {
    if (!isLoading) {
      setMessages(prev => [...messagesDB!, ...prev]);
    }

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }, 1);
  }, [messagesDB, isLoading]);

  //Stablizing websocket connection with our server
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');
    //Storing our websocket so we can access to it easier
    setWs(ws);

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.close();
      setWs(null);
    };
  }, []);

  return (
    <section className='w-full h-full flex flex-col'>
      <ChatHeader />
      {!isLoading ? (
        <Conversation
          messages={messages}
          scrollRef={scrollRef}
        />
      ) : (
        <section className='flex-grow'>
          <SkeletonChat />
        </section>
      )}
      <MessageInput
        scrollRef={scrollRef}
        ws={ws!}
        setMessages={setMessages}
      />
    </section>
  );
};

export default Chat;
