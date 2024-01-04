import { useGetProject } from './useGetProject';

const Sidebar = () => {
  const { projectInfo, isLoading } = useGetProject();

  if (isLoading) return <h1>Loading project information...</h1>;

  console.log('Project info from sidebar', projectInfo);

  return (
    <aside className='bg-yellow-200 w-[12vw] min-w-[225px]'>
      <p>Projects dropdown</p>
      <p>Project info</p>
    </aside>
  );
};

export default Sidebar;
