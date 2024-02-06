import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteTask as deleteTaskAPI } from '../../serverActions/pagesAPI';
import type { PageType } from '../../types/pagesTypes';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as {
    pageId: string;
  };

  const { mutate: deleteTask, status } = useMutation({
    mutationFn: ({ taskId }: { taskId: string }) =>
      deleteTaskAPI({ pageId, taskId }),
    onSuccess: (_, { taskId }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        return {
          ...prevData,
          tasks: prevData.tasks?.filter(item => item._id !== taskId),
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteTask, isLoading: status === 'pending' };
};
