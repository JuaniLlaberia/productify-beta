import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

import Tag from './Tag';
import TasksContextMenu from './TasksContextMenu';
import BtnMenu from '../../../components/ButtonMenu';
import Modal from '../../../components/Modal';
import NewEditTaskForm from './NewTaskForm';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { PageTaskType } from '../../../types/pagesTypes';
import { useDeleteTask } from '../useDeleteTask';
import TaskCardInfo from './TaskCardInfo';

const TaskCard = ({ task }: { task: PageTaskType }) => {
  const { deleteTask, isLoading } = useDeleteTask();

  return (
    <BtnMenu>
      <li className='group bg-bg-light-2 dark:bg-bg-dark-1 w-full min-w-[300px] p-2 border border-border-light dark:border-border-dark rounded-md shadow-md md:cursor-pointer transition-colors'>
        <div className='flex justify-between items-center '>
          <h4 className='font-semibold py-1 text-text-light-1 dark:text-text-dark-1 2xl:text-lg'>
            {task.title ? task.title : 'Untitled'}
          </h4>
          <div className='md:hidden md:group-hover:block'>
            <BtnMenu.Toggle menuId='test-1234' />
          </div>
        </div>
        <p className='text-text-light-2 mb-4 w-full dark:text-text-dark-2 pt-1 mt-1 line-clamp-3'>
          {task.description}
        </p>
        <div className='mt-3 flex gap-2 items-center'>
          {task.tag ? (
            <Tag
              isSmall
              label={task.tag}
              color='purple'
            />
          ) : null}
          <Tag
            isSmall
            label={task.importance as string}
            color={`${
              task.importance === 'important'
                ? 'orange'
                : task.importance === 'urgent'
                ? 'red'
                : 'gray'
            }`}
          />
          {task?.subTasks?.length > 0 && (
            <p className='flex items-center gap-1 text-text-light-2'>
              <HiOutlineClipboardDocumentCheck size={17} />
              {task?.subTasks?.filter(task => task.completed).length}/
              {task?.subTasks?.length}
            </p>
          )}
        </div>
      </li>
      <Modal>
        <BtnMenu.Menu menuId='test-1234'>
          <TasksContextMenu taskInfo={task} />
        </BtnMenu.Menu>
        <Modal.Window
          removeCloseBtn
          windowId='task-info'
        >
          <TaskCardInfo
            status={task.status!}
            defaultData={task}
          />
          {/* <NewEditTaskForm
            status={task.status!}
            defaultData={task}
          /> */}
        </Modal.Window>
        <Modal.Window
          title='Delete task'
          removeCloseBtn
          windowId='delete-task'
        >
          <ConfirmationModal
            message='You are about to delete this task. Ones its deleted all data related to it will be deleted.'
            action={() => deleteTask({ taskId: task._id! })}
            isLoading={isLoading}
          />
        </Modal.Window>
      </Modal>
    </BtnMenu>
  );
};

export default TaskCard;
