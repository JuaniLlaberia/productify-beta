import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

import { createProjectChat } from '../../serverActions/chatsAPI';

export const useCreateProjChat = () => {
  const { projectId } = useParams() as { projectId: string };

  const { mutate: createChat, status } = useMutation({
    mutationFn: ({ name, members }: { name: string; members: string[] }) =>
      createProjectChat({ projectId, name, members }),
    onSuccess: () => {},
    onError: err => toast.error(err.message),
  });

  return { createChat, isLoading: status === 'pending' };
};
