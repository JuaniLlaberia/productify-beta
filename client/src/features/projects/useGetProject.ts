import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProject } from '../../serverActions/projectsAPI';

type ProjectInfoType = {
  //   _id: string;
  //   name: string;
  //   members: string[];
  //   adminsd: string[];
  //   createdBy: string;
};

export const useGetProject = () => {
  const { projectId } = useParams();

  if (!projectId) return {};

  const { data: projectInfo, isLoading } = useQuery({
    //<ProjectInfoType, Error>
    queryKey: ['project-info', projectId],
    queryFn: () => getProject(projectId),
    staleTime: 3000,
  });

  return { projectInfo, isLoading };
};
