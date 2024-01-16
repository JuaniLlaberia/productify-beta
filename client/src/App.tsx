import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import MainContent from './features/pages/main/MainContent';
import TasksContent from './features/pages/tasks/TasksContent';
import NotesContainer from './features/pages/notes/NotesContainer';
import { UserProvider } from './context/UserContext';
import UserInfoWindow from './features/settings/UserInfoWindow';
import PasswordWindow from './features/settings/PasswordWindow';
import AppearanceWindow from './features/settings/AppearanceWindow';
import SettingsPage from './pages/SettingsPage';
import HomeWrapper from './wrappers/HomeWrapper';
import ThemeProvider from './context/ThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <AuthLayout />,
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
        ],
      },
      {
        path: '/project/:projectId',
        element: <ProjectPage />,
        children: [
          {
            path: '/project/:projectId/home',
            element: <MainContent />,
          },
          {
            path: '/project/:projectId/events',
            element: <Calendar />,
          },
          {
            path: '/project/:projectId/notes/:pageId',
            element: <NotesContainer />,
          },
          {
            path: '/project/:projectId/task/:pageId',
            element: <TasksContent />,
          },
        ],
      },
      {
        path: '/join/:projectId',
        element: <JoinProjectComponent />,
      },
    ],
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
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
};

export default App;
