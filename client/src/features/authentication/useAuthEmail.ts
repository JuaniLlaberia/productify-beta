import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { authEmail } from '../../serverActions/authAPI';

export const useAuthEmail = () => {
  const [emailSent, setEmailSent] = useState(false);

  const { mutate: sendEmailAuth, status } = useMutation({
    mutationFn: (email: string) => authEmail(email),
    onSuccess: () => {
      setEmailSent(true);
      toast.success('Code sent to email.');
    },
    onError: err => toast.error(err.message),
  });

  return { sendEmailAuth, isSending: status === 'pending', emailSent };
};
