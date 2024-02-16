import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import { removeUserFromChat as removeUserFromChatAPI } from '../../serverActions/chatsAPI';

export const useDeleteUserFromChat = () => {
  const { projectId, chatId } = useParams() as {
    projectId: string;
    chatId: string;
  };

  const { mutate: removeUserFromChat, status } = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      removeUserFromChatAPI({ projectId, chatId, userId }),
    onSuccess: () => {},
    onError: err => toast.error(err.message),
  });

  return { removeUserFromChat, isLoading: status === 'pending' };
};
