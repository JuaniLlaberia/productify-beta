import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteContent as deleteContentAPI } from '../../serverActions/pagesAPI';
import type { PageType } from '../../types/pagesTypes';

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as {
    pageId: string;
  };

  const { mutate: deleteContent, status } = useMutation({
    mutationFn: ({ contentId }: { contentId: string }) =>
      deleteContentAPI({ pageId, contentId }),
    onSuccess: (_, { contentId }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        return {
          ...prevData,
          content: prevData.content?.filter(item => item._id !== contentId),
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteContent, isLoading: status === 'pending' };
};
