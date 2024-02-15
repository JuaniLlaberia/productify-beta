import { useMemo } from 'react';
import { HiOutlineCog6Tooth, HiOutlineHashtag } from 'react-icons/hi2';
import { useParams } from 'react-router';

import TaskChatSheet from '../../components/TaskChatSheet';
import { useProjectContext } from '../../context/ProjectContext';
import { Sheet, SheetTrigger } from '../../components/Sheet';

const ChatHeader = () => {
  const { chatId } = useParams();
  const { projectData } = useProjectContext();
  const chatInfo = projectData.chats.filter(chat => chat._id === chatId)[0];

  const chatMembersData = useMemo(
    () =>
      projectData.members.filter(member =>
        chatInfo.members.includes(member._id!)
      ),
    [projectData.members, chatInfo.members]
  );

  return (
    <Sheet>
      <header className='flex items-center justify-between'>
        <h3 className='flex items-center gap-2 font-semibold text-text-light-1 dark:text-text-dark-1 xl:text-xl'>
          <HiOutlineHashtag />
          {chatInfo.name}
        </h3>
        <SheetTrigger asChild>
          <button className='flex items-center gap-1 xl:text-lg text-text-light-2 dark:text-text-dark-2 py-1 px-2 hover:bg-bg-light-hover-2 hover:rounded-lg transition-colors'>
            <HiOutlineCog6Tooth size={20} />
            <span className='hidden md:block'>Chat settings</span>
          </button>
        </SheetTrigger>
      </header>
      <TaskChatSheet
        type='chat'
        contentData={chatInfo}
        membersData={chatMembersData}
      />
    </Sheet>
  );
};

export default ChatHeader;
