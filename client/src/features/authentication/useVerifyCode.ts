import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { verifyAuthCode } from '../../serverActions/authAPI';

export const useVerifyCode = () => {
  const navigate = useNavigate();

  const { mutate: verifyCode, status } = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyAuthCode({ email, code }),
    onSuccess: () => navigate('/home'),
    onError: err => toast.error(err.message),
  });

  return {
    verifyCode,
    isLoading: status === 'pending',
    isError: status === 'error',
  };
};
