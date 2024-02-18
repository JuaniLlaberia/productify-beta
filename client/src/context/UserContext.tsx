import { ReactNode, createContext, useContext } from 'react';
import { AuthType, useGetAuth } from '../features/authentication/useGetAuth';
import { ClipLoader } from 'react-spinners';

type ContextType = {
  user?: AuthType;
};

const UserContext = createContext<ContextType>({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userData, isLoading } = useGetAuth();

  if (isLoading)
    return (
      <main className='h-screen w-full bg-bg-light-2'>
        <ClipLoader
          color='black'
          size={50}
        />
      </main>
    );

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
