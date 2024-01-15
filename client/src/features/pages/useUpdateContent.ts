import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { updateContent } from '../../serverActions/pagesAPI';
import type { PageContentType, PageType } from '../../types/pagesTypes';

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as { pageId: string };

  const { mutate: editContent, status } = useMutation({
    mutationFn: ({ content }: { content: PageContentType }) =>
      updateContent({ pageId, content }),
    onSuccess: (_, { content }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        const updatedContent = prevData.content?.map(item => {
          if (item._id === content._id) {
            return { ...content };
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

  return { editContent, isLoading: status === 'pending' };
};
