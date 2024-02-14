import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getInvitationCode } from '../../serverActions/invitationsAPI';

export const useGetInvCode = () => {
  const { projectId } = useParams() as { projectId: string };

  const { data: invCode, isLoading } = useQuery({
    queryKey: ['project-inv-key', projectId],
    queryFn: () => getInvitationCode(projectId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { invCode, isLoading };
};
