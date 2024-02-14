import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { resetInvitationCode as resetInvitationCodeAPI } from '../../serverActions/invitationsAPI';

export const useResetInvCode = () => {
  const queryClient = useQueryClient();
  const { projectId } = useParams() as { projectId: string };

  const { mutate: resetInvitationCode, status } = useMutation({
    mutationFn: (invitationId: string) =>
      resetInvitationCodeAPI({ invitationId, projectId }),
    onSuccess: data => {
      queryClient.setQueryData(['project-inv-key', projectId], data);
    },
    onError: err => toast.error(err.message),
  });

  return { resetInvitationCode, isLoading: status === 'pending' };
};
