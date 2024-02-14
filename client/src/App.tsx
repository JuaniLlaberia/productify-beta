import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import LandingPage from './pages/LandingPage';
import ProtectRoutes from './wrappers/ProtectRoutes';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import ProjectFormPage from './pages/ProjectFormPage';
import LoginPage from './pages/LoginPage';
import AuthLayout from './wrappers/AuthLayout';
import Calendar from './features/events/Calendar';
import JoinProjectComponent from './features/projects/JoinProjectComponent';
import TasksContent from './features/pages/tasks/TasksContent';
import { UserProvider } from './context/UserContext';
import UserInfoWindow from './features/settings/UserInfoWindow';
import PasswordWindow from './features/settings/PasswordWindow';
import AppearanceWindow from './features/settings/AppearanceWindow';
import SettingsPage from './pages/SettingsPage';
import HomeWrapper from './wrappers/HomeWrapper';
import ThemeProvider from './context/ThemeContext';
import ProjectHomePage from './features/projects/ProjectHomePage';
import Chat from './features/chats/Chat';
import ErrorPage from './pages/ErrorPage';

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
            path: '/project/:projectId/events',
            element: <Calendar />,
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
            <RouterProvider router={router} />
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
