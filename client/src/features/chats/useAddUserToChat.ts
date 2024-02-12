import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import { addUsersToChat as addUsersToChatAPI } from '../../serverActions/chatsAPI';

export const useAddUserToChat = () => {
  const { projectId, chatId } = useParams() as {
    projectId: string;
    chatId: string;
  };

  const { mutate: addUsersToChat, status } = useMutation({
    mutationFn: ({ users }: { users: string[] }) =>
      addUsersToChatAPI({ projectId, chatId, users }),
    onSuccess: () => {},
    onError: err => toast.error(err.message),
  });

  return { addUsersToChat, isLoading: status === 'pending' };
};
