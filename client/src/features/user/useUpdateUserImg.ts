import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateUserImg as updateUserImgAPI } from '../../serverActions/userAPI';
import { UserType } from '../authentication/useGetAuth';

export const useUpdateUserImg = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserImg, status } = useMutation({
    mutationFn: (profileImg?: FormData) => updateUserImgAPI(profileImg),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      queryClient.setQueryData(['auth-user'], (prevData: UserType) => {
        return {
          ...prevData,
          profileImg: data,
        };
      });
    },
    onError: err => toast.error(err.message),
  });

  return { updateUserImg, isLoading: status === 'pending' };
};
