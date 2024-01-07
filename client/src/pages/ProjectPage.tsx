import { useGetProject } from '../features/projects/useGetProject';

const ProjectPage = () => {
  const { projectInfo, isLoading } = useGetProject();

  if (isLoading) return <p>ISLOADING</p>;

  return <div>{projectInfo?.name}</div>;
};

export default ProjectPage;
