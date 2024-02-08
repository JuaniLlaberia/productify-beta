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
        const updatedTasks = prevData.tasks?.map(item => {
          if (item._id === task._id) {
            return { ...task };
          }
          return item;
        });

        return {
          ...prevData,
          tasks: updatedTasks,
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { editTask, isLoading: status === 'pending' };
};
