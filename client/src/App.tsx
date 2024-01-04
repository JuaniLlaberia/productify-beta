import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import ProtectRoutes from './wrappers/ProtectRoutes';
import Layout from './wrappers/Layout';
import { LoginPage } from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    element: <ProtectRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/home',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
        <Toaster
          position='bottom-right'
          richColors
          closeButton
          toastOptions={{
            style: {
              fontSize: '1rem',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
