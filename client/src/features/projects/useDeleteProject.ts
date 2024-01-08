import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteProject as deleteProjectAPI } from '../../serverActions/projectsAPI';

export const useDeleteProject = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectId } = useParams() as { projectId: string };

  const { mutate: deleteProject, status } = useMutation({
    mutationFn: () => deleteProjectAPI(projectId),
    onSuccess: () => {
      navigate('/home');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
    onError: err => toast.error(err.message),
  });

  return { deleteProject, isLoading: status === 'pending' };
};
