import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { createPage as createPageAPI } from '../../serverActions/pagesAPI';
import { ProjectInfoType } from '../../types/projectTypes';

export const useCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  const { mutate: createPage, status } = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      createPageAPI({ name, projectId: `${projectId}` }),
    onSuccess: ({ _id, name }) => {
      queryClient.setQueryData(
        ['project-info', projectId],
        (prevData: ProjectInfoType) => {
          return {
            ...prevData,
            pages: [...prevData.pages, { _id, name }],
          };
        }
      );

      navigate(`${_id}`);
      toast.success('Page created successfully');
    },
    onError: err => toast.error(err.message),
  });

  return { createPage, isLoading: status === 'pending' };
};
