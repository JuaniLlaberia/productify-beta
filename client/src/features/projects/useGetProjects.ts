import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../serverActions/projectsAPI';

type ProjectPrevType = {
  status: string;
  data: {
    _id: string;
    name: string;
    createdBy: string;
    membersCount: number;
  }[];
};

export const useGetProjects = () => {
  const { data: projects, isLoading } = useQuery<ProjectPrevType>({
    queryKey: ['projects'],
    queryFn: getProjects,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 30000,
  });

  return { projects, isLoading };
};
