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
          <p>PAGE CONTENT</p>
        </Project.Content>
      </Project>
    </ProjectProvider>
  );
};

export default ProjectPage;
