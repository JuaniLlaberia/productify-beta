import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { removeUserFromBoard as removeUserFromBoardAPI } from '../../serverActions/pagesAPI';
import { PageType } from '../../types/pagesTypes';

export const useDeleteUserFromBoard = () => {
  const queryClient = useQueryClient();
  const { pageId, projectId } = useParams() as {
    pageId: string;
    projectId: string;
  };

  const { mutate: removeUserFromBoard, status } = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      removeUserFromBoardAPI({ pageId, userId, projectId }),
    onSuccess: (_, { userId }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        const updatedMembers = prevData.members.filter(
          members => members !== userId
        );

        return {
          ...prevData,
          members: updatedMembers,
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { removeUserFromBoard, isLoading: status === 'pending' };
};
