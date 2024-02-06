import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { changeStatus as changeStatusAPI } from '../../serverActions/pagesAPI';
import { PageType } from '../../types/pagesTypes';

type StatusChangeType = {
  status: string;
  taskId: string;
};

export const useChangeStatusTask = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as { pageId: string };

  const { mutate: changeStatus, status } = useMutation({
    mutationFn: ({ taskId, status }: StatusChangeType) =>
      changeStatusAPI({ pageId, taskId, status }),
    onSuccess: (_, { taskId, status }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        const updatedContent = prevData.tasks?.map(item => {
          if (item._id === taskId) {
            return { ...item, status };
          }
          return item;
        });

        return {
          ...prevData,
          tasks: updatedContent,
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { changeStatus, isLoading: status === 'pending' };
};
