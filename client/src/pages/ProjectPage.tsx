import Navbar from '../features/projects/Navbar';
import ProjectWrapper from '../features/projects/ProjectWrapper';
import Sidebar from '../features/projects/Sidebar';
import Content from '../features/projects/Content';

const ProjectPage = () => {
  return (
    <ProjectWrapper>
      <Sidebar />
      <section className='flex flex-col flex-1'>
        <Navbar />
        <Content />
      </section>
    </ProjectWrapper>
  );
};

export default ProjectPage;
