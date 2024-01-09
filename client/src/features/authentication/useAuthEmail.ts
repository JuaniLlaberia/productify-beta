import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authEmail } from '../../serverActions/authAPI';

export const useAuthEmail = () => {
  const { mutate: sendEmailAuth, status } = useMutation({
    mutationFn: (email: string) => authEmail(email),
    onSuccess: () => toast.success('Code sent to email.'),
    onError: err => toast.error(err.message),
  });

  return { sendEmailAuth, isSending: status === 'pending' };
};
