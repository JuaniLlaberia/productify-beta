import { useQuery } from '@tanstack/react-query';
import { getPage } from '../../serverActions/pagesAPI';
import { useParams } from 'react-router-dom';

export const useGetPage = () => {
  const { pageId } = useParams() as { pageId: string };

  const { data: pageInfo, isLoading } = useQuery({
    queryKey: ['page-info', pageId],
    queryFn: () => getPage(pageId),
    refetchOnWindowFocus: false,
    staleTime: 5000,
    enabled: Boolean(pageId),
  });

  return { pageInfo, isLoading };
};
