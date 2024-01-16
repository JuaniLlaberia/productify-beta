import { HiOutlinePlus } from 'react-icons/hi2';

import TaskCard from './TaskCard';
import Modal from '../../../components/Modal';
import { useProjectContext } from '../../../context/ProjectContext';
import type { PageContentType } from '../../../types/pagesTypes';

type ColumnType = {
  tasks: PageContentType[];
};

const TasksColumn = ({ tasks }: ColumnType) => {
  const { isAdmin } = useProjectContext();

  return (
    <section className='w-full'>
      <ul className='flex flex-col gap-2 py-2 px-2 min-w-[325px]'>
        {tasks?.length >= 1 ? (
          tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))
        ) : isAdmin ? (
          <>
            <Modal.Open windowId='new-task-modal'>
              <button className='flex items-center gap-2 w-full text-lg font-semibold text-text-light-2 dark:text-text-dark-2 md:hover:bg-bg-light-hover-2 p-1 rounded-lg transition-colors'>
                <HiOutlinePlus size={18} /> Add
              </button>
            </Modal.Open>
          </>
        ) : (
          <p className='text-center pt-3 text-text-light-2 dark:text-text-dark-2'>
            No tasks available
          </p>
        )}
      </ul>
    </section>
  );
};

export default TasksColumn;
