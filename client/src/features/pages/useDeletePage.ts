import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deletePage as deletePageAPI } from '../../serverActions/pagesAPI';
import { ProjectInfoType } from '../../types/projectTypes';

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectId } = useParams() as { projectId: string };

  const { mutate: deletePage, status } = useMutation({
    mutationFn: ({ pageId }: { pageId: string }) =>
      deletePageAPI({ pageId, projectId }),
    onSuccess: (_, { pageId }) => {
      navigate(`/project/${projectId}/home`);

      queryClient.setQueryData(
        ['project-info', projectId],
        (prevData: ProjectInfoType) => {
          const updatedPages = prevData.pages.filter(
            page => page._id !== pageId
          );
          return { ...prevData, pages: updatedPages };
        }
      );
    },
    onError: err => toast.error(err.message),
  });

  return { deletePage, isLoading: status === 'pending' };
};
