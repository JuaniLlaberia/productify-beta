import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import ProtectRoutes from './wrappers/ProtectRoutes';
import AuthPage from './pages/AuthPage';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import { Toaster } from 'sonner';
import ProjectPage from './pages/ProjectPage';
import ProjectFormPage from './pages/ProjectFormPage';
import LoginPage from './pages/LoginPage';
import AuthLayout from './wrappers/AuthLayout';
import Calendar from './features/events/Calendar';
import JoinProjectComponent from './features/projects/JoinProjectComponent';
import NotesContent from './features/pages/notes/NotesContent';
import MainContent from './features/pages/main/MainContent';
import TasksContent from './features/pages/tasks/TasksContent';

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
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/project/new',
        element: <ProjectFormPage />,
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
            element: <NotesContent />,
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
