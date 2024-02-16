import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUsersToBoard as addUsersToBoardAPI } from '../../serverActions/pagesAPI';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { PageType } from '../../types/pagesTypes';

export const useAddUsersToBoard = () => {
  const queryClient = useQueryClient();
  const { pageId, projectId } = useParams() as {
    pageId: string;
    projectId: string;
  };

  const { mutate: addUsersToBoard, status } = useMutation({
    mutationFn: ({ users }: { users: string[] }) =>
      addUsersToBoardAPI({ pageId, users, projectId }),
    onSuccess: (_, { users }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        return {
          ...prevData,
          members: [...prevData.members, ...users],
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { addUsersToBoard, isLoading: status === 'pending' };
};
