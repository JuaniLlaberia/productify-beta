import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { addColumn as addColumnAPI } from '../../serverActions/pagesAPI';
import type { PageColumnType, PageType } from '../../types/pagesTypes';

export const useCreateColumn = () => {
  const { pageId } = useParams() as { pageId: string };
  const queryClient = useQueryClient();

  const { mutate: addColumn, status } = useMutation({
    mutationFn: (column: PageColumnType) => addColumnAPI({ pageId, column }),
    onSuccess: data => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        return {
          ...prevData,
          columns: [...prevData.columns, data],
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { addColumn, isLoading: status === 'pending' };
};
