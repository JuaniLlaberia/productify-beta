import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import BtnMenu from '../../../components/ButtonMenu';
import DuplicateBtn from './DuplicateBtn';
import { PageTaskType } from '../../../types/pagesTypes';

const TasksContextMenu = ({ taskInfo }: { taskInfo: PageTaskType }) => {
  return (
    <ul>
      <Modal.Open windowId='task-info'>
        <BtnMenu.Button icon={<HiOutlineEye />}>Open task</BtnMenu.Button>
      </Modal.Open>
      <DuplicateBtn taskInfo={taskInfo} />
      <Modal.Open windowId='delete-task'>
        <BtnMenu.Button
          danger
          icon={<HiOutlineTrash />}
        >
          Remove task
        </BtnMenu.Button>
      </Modal.Open>
    </ul>
  );
};

export default TasksContextMenu;
