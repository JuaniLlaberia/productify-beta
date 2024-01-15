import { ReactNode, createContext, useContext } from 'react';
import { AuthType, useGetAuth } from '../features/authentication/useGetAuth';

type ContextType = {
  user?: AuthType;
};

const UserContext = createContext<ContextType>({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userData, isLoading } = useGetAuth();

  if (isLoading) return <h1>Loading user data...</h1>;

  return (
    <UserContext.Provider value={{ user: userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context == null) throw new Error('Needs to be use inside the provider');

  return context;
};
