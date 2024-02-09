import { memo } from 'react';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import DuplicateBtn from './DuplicateBtn';
import { PageTaskType } from '../../../types/pagesTypes';
import { DropdownMenuItem } from '../../../components/DropdownMenu';
import { SheetTrigger } from '../../../components/Sheet';

const TasksContextMenuMobile = ({ taskInfo }: { taskInfo: PageTaskType }) => {
  return (
    <>
      <SheetTrigger className='w-full'>
        <DropdownMenuItem icon={<HiOutlineEye />}>Open task</DropdownMenuItem>
      </SheetTrigger>

      <DuplicateBtn
        mobile
        taskInfo={taskInfo}
      />

      <Modal.Open windowId='delete-task'>
        <DropdownMenuItem
          icon={<HiOutlineTrash />}
          danger
        >
          Remove task
        </DropdownMenuItem>
      </Modal.Open>
    </>
  );
};

export default memo(TasksContextMenuMobile);
