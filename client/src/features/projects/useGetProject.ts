import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProject } from '../../serverActions/projectsAPI';

export const useGetProject = () => {
  const { projectId } = useParams();

  const { data: projectInfo, isLoading } = useQuery({
    queryKey: ['project-info', projectId],
    queryFn: () => getProject(projectId as string),
    staleTime: 300000,
  });

  return { projectInfo, isLoading };
};
