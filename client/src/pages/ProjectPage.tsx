import Project from '../features/projects/ProjectInfoLayout';
import ProjectSidebar from '../features/projects/ProjectSidebar';

const ProjectPage = () => {
  return (
    <Project>
      <Project.Sidebar>
        <ProjectSidebar />
      </Project.Sidebar>
      <Project.Content>
        <p>PAGE CONTENT</p>
      </Project.Content>
    </Project>
  );
};

export default ProjectPage;
