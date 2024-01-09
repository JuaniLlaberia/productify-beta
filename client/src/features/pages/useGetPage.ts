import { useQuery } from '@tanstack/react-query';
import { getPage } from '../../serverActions/pagesAPI';
import { useSearchParams } from 'react-router-dom';

export const useGetPage = () => {
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('pageId');

  const { data: pageInfo, isLoading } = useQuery({
    queryKey: ['page-info', pageId],
    queryFn: () => getPage(pageId),
    refetchOnWindowFocus: false,
    staleTime: 5000,
    enabled: Boolean(pageId),
  });

  return { pageInfo, isLoading };
};
