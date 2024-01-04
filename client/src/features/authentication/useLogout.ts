import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { logout as logoutAPI } from '../../serverActions/authAPI';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, status } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      navigate('/');
    },
    onError: err => toast.error(err.message),
  });

  return { logout, isLoading: status === 'pending' };
};
