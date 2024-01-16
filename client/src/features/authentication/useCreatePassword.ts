import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createPassword as createPasswordAPI } from '../../serverActions/authAPI';
import { PasswordsType } from '../../types/extraTypes';

export const useCreatePassword = () => {
  const { mutate: createPassword, status } = useMutation({
    mutationFn: ({ password, confirmedPassword }: PasswordsType) =>
      createPasswordAPI({ password, confirmedPassword }),
    onSuccess: () => toast.success('Password created successfully'),
    onError: err => toast.error(err.message),
  });

  return { createPassword, isLoading: status === 'pending' };
};
