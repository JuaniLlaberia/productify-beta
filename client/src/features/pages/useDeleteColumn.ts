import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteColumn as deleteColumnAPI } from '../../serverActions/pagesAPI';
import type { PageType } from '../../types/pagesTypes';

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as {
    pageId: string;
  };

  const { mutate: deleteColumn, status } = useMutation({
    mutationFn: ({ columnId }: { columnId: string }) =>
      deleteColumnAPI({ pageId, columnId }),
    onSuccess: (_, { columnId }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        return {
          ...prevData,
          columns: prevData.columns?.filter(item => item._id !== columnId),
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteColumn, isLoading: status === 'pending' };
};
