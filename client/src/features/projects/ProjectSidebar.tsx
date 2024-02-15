import { HiOutlineCalendarDays, HiOutlineSquares2X2 } from 'react-icons/hi2';

import PageItem from '../pages/PageItem';
import PagestList from '../pages/PagestList';
import PageChatItem from '../pages/PageChatItem';
import SidebarHeader from './SidebarHeader';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectSidebar = ({ onClose }: { onClose?: () => void }) => {
  const { isAdmin, isOwner, projectData } = useProjectContext();
  const { name, pages, chats } = projectData;

  return (
    <div className='flex flex-col h-full'>
      <SidebarHeader
        name={name}
        isAdmin={isAdmin}
        isOwner={isOwner}
      />
      <section className='mb-6'>
        <h2 className='uppercase text-xs font-semibold text-text-dark-2 px-2 mb-2'>
          General Pages
        </h2>
        <ul className='px-2'>
          <PageItem
            noMenu
            onClose={onClose!}
            label='All boards'
            icon={<HiOutlineSquares2X2 />}
            link='home'
          />
          <PageItem
            noMenu
            onClose={onClose!}
            label='Events'
            icon={<HiOutlineCalendarDays />}
            link='events'
          />
          <PageChatItem
            chats={chats}
            onClose={onClose!}
          />
        </ul>
      </section>
      <section className='mb-2 overflow-y-auto'>
        <PagestList
          onClose={onClose!}
          title='Project Boards'
          pages={pages}
        />
      </section>
    </div>
  );
};

export default ProjectSidebar;
