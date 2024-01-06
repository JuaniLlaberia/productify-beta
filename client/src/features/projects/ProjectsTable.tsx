import ProjectsTableItems from './ProjectsTableItems';
import { useUserContext } from '../../context/UserContext';
import { useGetProjects } from '../projects/useGetProjects';

const ProjectsTable = () => {
  const { user } = useUserContext();
  const { projects, isLoading } = useGetProjects();

  if (isLoading) return <h1>Loading</h1>;

  return (
    <ul className='flex flex-col gap-2 w-full'>
      {projects?.data.map(project => (
        <ProjectsTableItems
          key={project._id}
          id={project._id}
          name={project.name}
          members={project.membersCount}
          isCreator={user?.data?._id === project.createdBy}
        />
      ))}
    </ul>
  );
};

export default ProjectsTable;
