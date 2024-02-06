import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { updateTask } from '../../serverActions/pagesAPI';
import type { PageTaskType, PageType } from '../../types/pagesTypes';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as { pageId: string };

  const { mutate: editTask, status } = useMutation({
    mutationFn: ({ task }: { task: PageTaskType }) =>
      updateTask({ pageId, task }),
    onSuccess: (_, { task }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        const updatedContent = prevData.tasks?.map(item => {
          if (item._id === task._id) {
            return { ...task };
          }
          return item;
        });

        return {
          ...prevData,
          content: updatedContent,
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { editTask, isLoading: status === 'pending' };
};
