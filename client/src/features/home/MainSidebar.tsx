import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineFolder,
  HiOutlineShieldExclamation,
} from 'react-icons/hi2';
import PageItem from '../pages/PageItem';

const MainSidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <nav className='my-3'>
      <h1 className='text-center mb-6'>LOGO</h1>
      <h2 className='uppercase text-xs font-semibold text-text-dark-2 px-2 mb-2 xl:text-sm'>
        Quick Access
      </h2>
      <ul className='flex flex-col gap-1 px-2'>
        <PageItem
          noMenu
          onClose={onClose!}
          label='My Projects'
          icon={<HiOutlineFolder />}
          link='/home'
        />
        <PageItem
          noMenu
          onClose={onClose!}
          label='My Chats'
          icon={<HiOutlineChatBubbleLeftRight />}
          link='/chats'
        />
        <PageItem
          noMenu
          onClose={onClose!}
          label='User Settings'
          icon={<HiOutlineCog6Tooth />}
          link='/settings'
        />
        <PageItem
          noMenu
          onClose={onClose!}
          label='Support'
          icon={<HiOutlineShieldExclamation />}
          link='/support'
        />
      </ul>
    </nav>
  );
};

export default MainSidebar;
