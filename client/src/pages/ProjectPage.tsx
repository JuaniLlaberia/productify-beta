import { Outlet } from 'react-router-dom';

import Project from '../features/projects/ProjectInfoLayout';
import ProjectSidebar from '../features/projects/ProjectSidebar';
import { ProjectProvider } from '../context/ProjectContext';

const ProjectPage = () => {
  return (
    <ProjectProvider>
      <Project>
        <Project.Sidebar>
          <ProjectSidebar />
        </Project.Sidebar>
        <Project.Content>
          <Outlet />
        </Project.Content>
      </Project>
    </ProjectProvider>
  );
};

export default ProjectPage;
