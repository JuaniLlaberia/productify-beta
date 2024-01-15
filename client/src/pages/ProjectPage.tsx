import { Outlet } from 'react-router-dom';

import Project from '../features/projects/ProjectInfoLayout';
import { ProjectProvider } from '../context/ProjectContext';

const ProjectPage = () => {
  return (
    <ProjectProvider>
      <Project>
        <Project.Sidebar />
        <Project.Content>
          <Outlet />
        </Project.Content>
      </Project>
    </ProjectProvider>
  );
};

export default ProjectPage;
