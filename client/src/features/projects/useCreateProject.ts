import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { createProject as createProjectAPI } from '../../serverActions/projectsAPI';
import { NewProjectType } from '../../types/projectTypes';

export const useCreateProject = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createProject, status } = useMutation({
    mutationFn: (newProject: NewProjectType) => createProjectAPI(newProject),
    onSuccess: ({ projectId }) => {
      navigate(`/project/${projectId}`);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created');
    },
    onError: err => toast.error(err.message),
  });

  return { createProject, isLoading: status === 'pending' };
};
