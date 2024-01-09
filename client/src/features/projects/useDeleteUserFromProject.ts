import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteUserFromProject } from '../../serverActions/projectsAPI';
import { ProjectInfoType } from '../../types/projectTypes';

export const useDeleteUserFromProject = () => {
  const { projectId } = useParams() as { projectId: string };
  const queryClient = useQueryClient();

  const { mutate: deleteUser, status } = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      deleteUserFromProject({ userId, projectId }),

    onSuccess: (_, variables) => {
      const { userId } = variables;
      queryClient.setQueryData(
        ['project-info', projectId],
        (prevData: ProjectInfoType) => {
          const updatedMembers = prevData.members.filter(
            member => member._id !== userId
          );
          return { ...prevData, members: updatedMembers };
        }
      );
    },

    onError: err => toast.error(err.message),
  });

  return { deleteUser, isLoading: status === 'pending' };
};
