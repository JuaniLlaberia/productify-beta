import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteProject as deleteProjectAPI } from '../../serverActions/projectsAPI';
import { ProjectPrevType } from '../../types/projectTypes';

export const useDeleteProject = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectId } = useParams() as { projectId: string };

  const { mutate: deleteProject, status } = useMutation({
    mutationFn: () => deleteProjectAPI(projectId),
    onSuccess: () => {
      navigate('/home');
      queryClient.setQueryData(['projects'], (prevData: ProjectPrevType) => {
        console.log(prevData);

        const updatedData = prevData.data.filter(
          project => project._id !== projectId
        );
        return { ...prevData, data: updatedData };
      });
      toast.success('Project deleted');
    },
    onError: err => toast.error(err.message),
  });

  return { deleteProject, isLoading: status === 'pending' };
};
