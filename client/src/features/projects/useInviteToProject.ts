import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { inviteToProject } from '../../serverActions/projectsAPI';

type FunctionType = {
  emails: string[];
  projectId: string;
  projectName: string;
};

export const useInviteToProject = () => {
  const { mutate: inviteUsers, status } = useMutation({
    mutationFn: ({ emails, projectId, projectName }: FunctionType) =>
      inviteToProject({ emails, projectId, projectName }),
    onSuccess: () => toast.success('Invitations sent'),
    onError: err => toast.error(err.message),
  });

  return { inviteUsers, isLoading: status === 'pending' };
};
