import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { deleteUser } from '../../serverActions/userAPI';

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteMe, status } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      navigate('/');
    },
    onError: err => toast.error(err.message),
  });

  return { deleteMe, isLoading: status === 'pending' };
};
