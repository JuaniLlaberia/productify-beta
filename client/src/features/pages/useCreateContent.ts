import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { addContent as addContentAPI } from '../../serverActions/pagesAPI';
import type { PageContentType } from '../../types/pagesTypes';

export const useCreateContent = () => {
  const { pageId } = useParams() as { pageId: string };
  const queryClient = useQueryClient();

  const { mutate: addContent, status } = useMutation({
    mutationFn: (content: PageContentType) =>
      addContentAPI({ pageId, content }),
    onSuccess: data => {
      queryClient.setQueryData(
        ['page-info', pageId],
        (prevData: PageContentType) => {
          return {
            ...prevData,
            content: [...prevData.content, data],
          };
        }
      );
    },
    onError: err => toast.error(err.message),
  });

  return { addContent, isLoading: status === 'pending' };
};
