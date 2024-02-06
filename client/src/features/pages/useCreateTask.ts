import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { addTask as addTaskAPI } from '../../serverActions/pagesAPI';
import type { PageTaskType, PageType } from '../../types/pagesTypes';

export const useCreateTask = () => {
  const { pageId } = useParams() as { pageId: string };
  const queryClient = useQueryClient();

  const { mutate: addTask, status } = useMutation({
    mutationFn: (task: PageTaskType) => addTaskAPI({ pageId, task }),
    onSuccess: data => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        return {
          ...prevData,
          tasks: [...prevData.tasks, data],
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { addTask, isLoading: status === 'pending' };
};
