import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import BtnMenu from '../../../components/ButtonMenu';
import { PageContentType } from '../../../types/pagesTypes';
import { useChangeStatusTask } from './useChangeStatusTask';

const TasksContextMenu = ({ taskInfo }: { taskInfo: PageContentType }) => {
  const { changeStatus } = useChangeStatusTask();

  return (
    <ul>
      <Modal.Open windowId='edit-task'>
        <BtnMenu.Button icon={<HiOutlinePencil />}>Edit task</BtnMenu.Button>
      </Modal.Open>

      {taskInfo.status === 'pending' || taskInfo.status === 'progress' ? (
        <BtnMenu.Button
          onClick={() =>
            changeStatus({
              contentId: taskInfo._id!,
              status: taskInfo.status === 'pending' ? 'progress' : 'finished',
            })
          }
          icon={<HiOutlineArrowRight />}
        >
          Next status
        </BtnMenu.Button>
      ) : null}

      {taskInfo.status === 'progress' || taskInfo.status === 'finished' ? (
        <BtnMenu.Button
          onClick={() =>
            changeStatus({
              contentId: taskInfo._id!,
              status: taskInfo.status === 'progress' ? 'pending' : 'progress',
            })
          }
          icon={<HiOutlineArrowLeft />}
        >
          Prev status
        </BtnMenu.Button>
      ) : null}

      <Modal.Open windowId='delete-task'>
        <BtnMenu.Button icon={<HiOutlineTrash />}>Remove task</BtnMenu.Button>
      </Modal.Open>
    </ul>
  );
};

export default TasksContextMenu;
