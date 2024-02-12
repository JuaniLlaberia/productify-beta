import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getChatMessages } from '../../serverActions/chatsAPI';

export const useGetMessages = () => {
  const { chatId } = useParams() as { chatId: string };

  const { data: messages, isLoading } = useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: () => getChatMessages({ chatId, page: 1 }),
    refetchOnWindowFocus: false,
  });

  return { messages, isLoading };
};
