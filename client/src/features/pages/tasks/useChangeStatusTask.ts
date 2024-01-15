import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { changeStatus as changeStatusAPI } from '../../../serverActions/pagesAPI';
import { PageType } from '../../../types/pagesTypes';

type StatusChangeType = {
  status: 'pending' | 'progress' | 'finished';
  contentId: string;
};

export const useChangeStatusTask = () => {
  const queryClient = useQueryClient();
  const { pageId } = useParams() as { pageId: string };

  const { mutate: changeStatus, status } = useMutation({
    mutationFn: ({ contentId, status }: StatusChangeType) =>
      changeStatusAPI({ pageId, contentId, status }),
    onSuccess: (_, { contentId, status }) => {
      queryClient.setQueryData(['page-info', pageId], (prevData: PageType) => {
        const updatedContent = prevData.content?.map(item => {
          if (item._id === contentId) {
            return { ...item, status };
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

  return { changeStatus, isLoading: status === 'pending' };
};
