import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { deleteChat as deleteChatAPI } from '../../serverActions/chatsAPI';
import { ProjectInfoType } from '../../types/projectTypes';

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectId, chatId } = useParams() as {
    projectId: string;
    chatId: string;
  };

  const { mutate: deleteChat, status } = useMutation({
    mutationFn: () => deleteChatAPI({ projectId, chatId }),
    onSuccess: () => {
      navigate(`/project/${projectId}/home`);

      queryClient.setQueryData(
        ['project-info', projectId],
        (prevData: ProjectInfoType) => {
          const updatedChats = prevData.chats.filter(
            chat => chat._id !== chatId
          );
          return { ...prevData, chats: updatedChats };
        }
      );
    },
    onError: err => toast.error(err.message),
  });

  return { deleteChat, isLoading: status === 'pending' };
};
