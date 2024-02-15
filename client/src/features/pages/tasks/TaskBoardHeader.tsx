import { HiOutlineCog6Tooth, HiOutlineViewColumns } from 'react-icons/hi2';
import { useMemo } from 'react';

import TaskChatSheet from '../../../components/TaskChatSheet';
import { Sheet, SheetTrigger } from '../../../components/Sheet';
import { useProjectContext } from '../../../context/ProjectContext';
import { PageType } from '../../../types/pagesTypes';

const TaskBoardHeader = ({ pageInfo }: { pageInfo: PageType }) => {
  const { projectData } = useProjectContext();

  const boardMembersData = useMemo(
    () =>
      projectData.members.filter(member =>
        pageInfo?.members.includes(member._id!)
      ),
    [projectData.members, pageInfo?.members]
  );

  return (
    <Sheet>
      <header className='flex items-center sticky left-0 justify-between w-full p-4'>
        <h3 className='flex items-center gap-2 text-text-light-1 dark:text-text-dark-1 text-lg xl:text-xl'>
          <HiOutlineViewColumns />
          <span className='font-semibold'>{pageInfo?.name} adasd</span>
        </h3>
        <SheetTrigger asChild>
          <button className='flex items-center gap-1 xl:text-lg text-text-light-2 dark:text-text-dark-2 py-1 px-2 hover:bg-bg-light-hover-2 hover:rounded-lg transition-colors'>
            <HiOutlineCog6Tooth size={20} />
            <span className='hidden md:block'>Board settings</span>
          </button>
        </SheetTrigger>
      </header>

      <TaskChatSheet
        type='board'
        contentData={pageInfo}
        membersData={boardMembersData}
      />
    </Sheet>
  );
};

export default TaskBoardHeader;
