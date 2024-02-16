import ProjectsTableItems from './ProjectsTableItems';
import SkeletonProjectsTable from '../../components/skeletons/SkeletonProjectsTable';
import { useUserContext } from '../../context/UserContext';
import { useGetProjects } from '../projects/useGetProjects';

const ProjectsTable = () => {
  const { user } = useUserContext();
  const { projects, isLoading } = useGetProjects();

  if (isLoading) return <SkeletonProjectsTable />;

  const sortedProjects = projects?.data.sort((a, b) => {
    if (a.createdBy === user?.data?._id) {
      return -1;
    } else if (b.createdBy === user?.data?._id) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      {sortedProjects && sortedProjects?.length > 0 ? (
        <ul className='flex flex-col gap-2 w-full'>
          {sortedProjects?.map(project => (
            <ProjectsTableItems
              key={project._id}
              id={project._id}
              name={project.name}
              members={project.membersCount}
              isCreator={user?.data?._id === project.createdBy}
            />
          ))}
        </ul>
      ) : (
        <p className='text-center text-text-light-2 dark:text-text-dark-2 py-6 text-sm opacity-80'>
          You have no projects
        </p>
      )}
    </>
  );
};

export default ProjectsTable;
