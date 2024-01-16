import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateUser } from '../../serverActions/userAPI';
import { UserPreviewType } from '../../types/userTypes';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateMe, status } = useMutation({
    mutationFn: (userData: UserPreviewType) => updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateMe, isLoading: status === 'pending' };
};
