import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { ProjectInfoType } from '../../types/projectTypes';
import { toggleAdmin as toggleAdminAPI } from '../../serverActions/projectsAPI';

export const useToggleAdmin = () => {
  const { projectId } = useParams() as { projectId: string };
  const queryClient = useQueryClient();

  const { mutate: toggleAdmin, status } = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      toggleAdminAPI({ userId, projectId }),

    onSuccess: (_, variables) => {
      const { userId } = variables;
      queryClient.setQueryData(
        ['project-info', projectId],
        (prevData: ProjectInfoType) => {
          let updatedAdmins;
          if (prevData?.admins?.includes(userId)) {
            updatedAdmins = prevData.admins.filter(admin => admin !== userId);
          } else {
            updatedAdmins = [...prevData.admins, userId];
          }

          return { ...prevData, admins: updatedAdmins };
        }
      );
    },

    onError: err => toast.error(err.message),
  });

  return { toggleAdmin, isLoading: status === 'pending' };
};
