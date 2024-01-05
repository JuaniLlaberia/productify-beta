import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { projectId } = useParams();

  return <div>{projectId}</div>;
};

export default ProjectPage;
