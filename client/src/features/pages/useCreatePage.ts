import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { createPage as createPageAPI } from '../../serverActions/pagesAPI';
import { PageType } from '../../types/pagesTypes';

export const useCreatePage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { mutate: createPage, status } = useMutation({
    mutationFn: ({ name, pageType }: PageType) =>
      createPageAPI({ name, pageType, projectId: `${projectId}` }),
    onSuccess: ({ pageId }) => {
      navigate(`page/${pageId}`);
      toast.success('Page created successfully');
    },
    onError: err => toast.error(err.message),
  });

  return { createPage, isLoading: status === 'pending' };
};
