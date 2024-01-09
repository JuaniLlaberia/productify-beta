import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../serverActions/projectsAPI';

export const useGetProjects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 30000,
  });

  return { projects, isLoading };
};
