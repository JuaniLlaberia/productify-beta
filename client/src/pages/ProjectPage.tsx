import { Outlet } from 'react-router-dom';

import AppLayout from '../wrappers/AppLayout';
import ProjectSidebar from '../features/projects/ProjectSidebar';
import { ProjectProvider } from '../context/ProjectContext';

const ProjectPage = () => {
  return (
    <ProjectProvider>
      <AppLayout>
        <AppLayout.Sidebar>
          <ProjectSidebar />
        </AppLayout.Sidebar>
        <AppLayout.Content>
          <Outlet />
        </AppLayout.Content>
      </AppLayout>
    </ProjectProvider>
  );
};

export default ProjectPage;
