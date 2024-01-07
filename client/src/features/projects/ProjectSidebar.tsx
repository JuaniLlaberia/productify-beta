import { HiOutlineCalendarDays, HiOutlineHome } from 'react-icons/hi2';

import PageItem from '../pages/PageItem';
import PagestList from '../pages/PagestList';
import PageChatItem from '../pages/PageChatItem';
import SidebarHeader from './SidebarHeader';
import AlertCard from '../../components/AlertCard';
import { useGetProject } from './useGetProject';
import { useUserContext } from '../../context/UserContext';

const ProjectSidebar = () => {
  const { projectInfo, isLoading } = useGetProject();
  const { user } = useUserContext();

  if (isLoading) return <p>Isloading</p>;

  if (!projectInfo)
    return (
      <section className='p-4'>
        <AlertCard message='Failed to load project information.' />;
      </section>
    );

  const { name, pages, chats } = projectInfo;

  const isAdmin = projectInfo.admins.includes(user?.data?._id!);

  return (
    <>
      <SidebarHeader
        name={name}
        isAdmin={isAdmin}
      />
      <section className='mb-6'>
        <h2 className='uppercase text-xs font-semibold text-text-dark-2 px-2 mb-2'>
          General Pages
        </h2>
        <ul className='px-2'>
          <PageItem
            label='Home'
            icon={<HiOutlineHome />}
            link=''
          />
          <PageItem
            label='Events'
            icon={<HiOutlineCalendarDays />}
            link='events'
          />
          <PageChatItem chats={chats} />
        </ul>
      </section>
      <section className='mb-6'>
        <PagestList
          title='Project Pages'
          pages={pages}
        />
      </section>
    </>
  );
};

export default ProjectSidebar;
