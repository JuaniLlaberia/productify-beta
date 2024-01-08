import { ReactNode, createContext, useContext } from 'react';

import AlertCard from '../components/AlertCard';
import { ProjectInfoType } from '../types/projectTypes';
import { useGetProject } from '../features/projects/useGetProject';
import { useUserContext } from './UserContext';

type ProjectContextType = {
  projectData: ProjectInfoType;
  isAdmin: boolean;
  isOwner: boolean;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const { projectInfo, isLoading } = useGetProject();

  if (isLoading) return <p>Is loading</p>;

  if (!projectInfo)
    return (
      <section className='p-4'>
        <AlertCard message='Failed to load project information.' />;
      </section>
    );

  const isAdmin = projectInfo.admins.includes(user?.data?._id as string);
  const isOwner = projectInfo.createdBy === user?.data?._id;

  return (
    <ProjectContext.Provider
      value={{ projectData: projectInfo, isAdmin, isOwner }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const projectContext = useContext(ProjectContext);
  if (!projectContext)
    throw new Error('Must be use inside the Project provider.');

  return projectContext;
};
