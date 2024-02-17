import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { Suspense, lazy } from 'react';

import LandingPage from './pages/LandingPage';
import ProtectRoutes from './wrappers/ProtectRoutes';
import AuthLayout from './wrappers/AuthLayout';
import ThemeProvider from './context/ThemeContext';
import JoinProjectComponent from './features/projects/JoinProjectComponent';
import HomeWrapper from './wrappers/HomeWrapper';
import { UserProvider } from './context/UserContext';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectFormPage = lazy(() => import('./pages/ProjectFormPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const TasksContent = lazy(() => import('./features/pages/tasks/TasksContent'));
const UserInfoWindow = lazy(() => import('./features/settings/UserInfoWindow'));
const PasswordWindow = lazy(() => import('./features/settings/PasswordWindow'));
const AppearanceWindow = lazy(
  () => import('./features/settings/AppearanceWindow')
);
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ProjectHomePage = lazy(
  () => import('./features/projects/ProjectHomePage')
);
const Chat = lazy(() => import('./features/chats/Chat'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage type='error' />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <ProtectRoutes />,
    errorElement: <ErrorPage type='error' />,
    children: [
      {
        element: <HomeWrapper />,
        children: [
          {
            path: '/home',
            element: <HomePage />,
          },
          {
            path: '/project/new',
            element: <ProjectFormPage />,
          },
        ],
      },
      {
        path: '/settings',
        element: <SettingsPage />,
        children: [
          {
            path: '/settings/user',
            element: <UserInfoWindow />,
          },
          {
            path: '/settings/password',
            element: <PasswordWindow />,
          },
          {
            path: '/settings/appearance',
            element: <AppearanceWindow />,
          },
        ],
      },
      {
        path: '/project/:projectId',
        element: <ProjectPage />,
        children: [
          {
            path: '/project/:projectId/home',
            element: <ProjectHomePage />,
          },
          {
            path: '/project/:projectId/chats/:chatId',
            element: <Chat />,
          },
          {
            path: '/project/:projectId/:pageId',
            element: <TasksContent />,
          },
        ],
      },
      {
        path: 'project/join/:invitationId',
        element: <JoinProjectComponent />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage type='notfound' />,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ThemeProvider>
            <Suspense fallback={<p>Loading</p>}>
              <RouterProvider router={router} />
            </Suspense>
          </ThemeProvider>
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
      </QueryClientProvider>
    </>
  );
};

export default App;
