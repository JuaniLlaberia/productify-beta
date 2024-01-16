import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getAuth } from '../../serverActions/authAPI';

export type UserType = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImg?: string;
  membership: 'regular' | 'premium';
  projectsLeft: number;
};

export type AuthType = {
  status: 'success' | 'failed';
  data?: UserType;
  message?: string;
};

export const useGetAuth = () => {
  const { data: userData, isLoading }: UseQueryResult<AuthType, Error> =
    useQuery({
      queryKey: ['auth-user'],
      queryFn: getAuth,
      staleTime: 5 * 60 * 1000,
    });

  return { userData, isLoading };
};
