import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineEllipsisHorizontal,
} from 'react-icons/hi2';

import Tag from './Tag';
import Modal from '../../../components/Modal';
import ConfirmationModal from '../../../components/ConfirmationModal';
import TaskCardInfo from './TaskInfo';
import TasksContextMenu from './TasksContextMenu';
import TasksContextMenuMobile from './TasksContextMenuMobile';
import { PageTaskType } from '../../../types/pagesTypes';
import { useDeleteTask } from '../useDeleteTask';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../components/DropdownMenu';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '../../../components/ContextMenu';
import { Sheet, SheetContent, SheetTrigger } from '../../../components/Sheet';

const TaskCard = ({ task }: { task: PageTaskType }) => {
  const { deleteTask, isLoading } = useDeleteTask();

  return (
    <Sheet>
      <ContextMenu>
        <DropdownMenu>
          <ContextMenuTrigger>
            <SheetTrigger>
              <li className='bg-bg-light-2 dark:bg-bg-dark-1 w-[325px] p-2 border border-border-light dark:border-border-dark rounded-md shadow-md md:cursor-pointer transition-colors'>
                <header className='flex justify-between items-center'>
                  <h4 className='font-semibold py-1 text-text-light-1 dark:text-text-dark-1 2xl:text-lg'>
                    {task.title}
                  </h4>
                  <DropdownMenuTrigger className='md:hidden'>
                    <HiOutlineEllipsisHorizontal size={22} />
                  </DropdownMenuTrigger>
                </header>
                <p className='text-text-light-2 mb-4 w-full text-start dark:text-text-dark-2 pt-1 mt-1 line-clamp-3'>
                  {task.description}
                </p>
                <footer className='mt-3 flex gap-2 items-center'>
                  <Tag
                    small
                    label={task.tag as string}
                    color='purple'
                  />
                  <Tag
                    small
                    label={task.importance as string}
                    color={`${
                      task.importance === 'important'
                        ? 'orange'
                        : task.importance === 'urgent'
                        ? 'red'
                        : 'gray'
                    }`}
                  />
                  {task?.subTasks?.length! > 0 ? (
                    <p className='flex items-center gap-1 text-text-light-2'>
                      <HiOutlineClipboardDocumentCheck size={17} />
                      {task?.subTasks?.filter(task => task.completed).length}/
                      {task?.subTasks?.length}
                    </p>
                  ) : null}
                </footer>
              </li>
            </SheetTrigger>
          </ContextMenuTrigger>
          <Modal>
            {/* Menus */}
            <DropdownMenuContent>
              <TasksContextMenuMobile taskInfo={task} />
            </DropdownMenuContent>

            <ContextMenuContent>
              <TasksContextMenu taskInfo={task} />
            </ContextMenuContent>

            {/* Tasks deletion modal */}
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
        </DropdownMenu>
      </ContextMenu>

      <SheetContent>
        <TaskCardInfo defaultData={task} />
      </SheetContent>
    </Sheet>
  );
};

export default TaskCard;
