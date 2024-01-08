import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { leaveProject as leaveProjectAPI } from '../../serverActions/projectsAPI';

export const useLeaveProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { mutate: leaveProject, status } = useMutation({
    mutationFn: () => leaveProjectAPI(projectId as string),
    onSuccess: () => navigate('/home'),
    onError: err => toast.error(err.message),
  });

  return { leaveProject, isLoading: status === 'pending' };
};
