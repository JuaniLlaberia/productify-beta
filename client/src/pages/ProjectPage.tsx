import { Outlet } from 'react-router-dom';

import ProjectLayout from '../wrappers/ProjectLayout';
import ProjectSidebar from '../features/projects/ProjectSidebar';
import { ProjectProvider } from '../context/ProjectContext';

const ProjectPage = () => {
  return (
    <ProjectProvider>
      <ProjectLayout>
        <ProjectLayout.Sidebar>
          <ProjectSidebar />
        </ProjectLayout.Sidebar>
        <ProjectLayout.Content>
          <Outlet />
        </ProjectLayout.Content>
      </ProjectLayout>
    </ProjectProvider>
  );
};

export default ProjectPage;
