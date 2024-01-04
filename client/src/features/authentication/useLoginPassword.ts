import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { loginWithPassword } from '../../serverActions/authAPI';

export const useLoginPassword = () => {
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithPassword({ email, password }),
    onSuccess: () => navigate('/home'),
    onError: err => toast.error(err.message),
  });

  return { login, isLoading: status === 'pending' };
};
