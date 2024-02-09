import { memo } from 'react';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import DuplicateBtn from './DuplicateBtn';
import { PageTaskType } from '../../../types/pagesTypes';
import { SheetTrigger } from '../../../components/Sheet';
import { ContextMenuItem } from '../../../components/ContextMenu';

const TasksContextMenu = ({ taskInfo }: { taskInfo: PageTaskType }) => {
  return (
    <>
      <SheetTrigger className='w-full'>
        <ContextMenuItem icon={<HiOutlineEye />}>Open task</ContextMenuItem>
      </SheetTrigger>

      <DuplicateBtn taskInfo={taskInfo} />

      <Modal.Open windowId='delete-task'>
        <ContextMenuItem
          icon={<HiOutlineTrash />}
          danger
        >
          Remove task
        </ContextMenuItem>
      </Modal.Open>
    </>
  );
};

export default memo(TasksContextMenu);
