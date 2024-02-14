import { HiOutlinePlus } from 'react-icons/hi2';

import TaskCard from './TaskCard';
import Modal from '../../../components/Modal';
import type { PageTaskType } from '../../../types/pagesTypes';

type ColumnType = {
  id: string;
  tasks: PageTaskType[];
};

const ColumnBody = ({ id, tasks }: ColumnType) => {
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
        ) : (
          <>
            <Modal.Open windowId={`new-task-modal-${id}`}>
              <button className='flex items-center gap-2 w-full text-lg font-semibold text-text-light-2 dark:text-text-dark-2 md:hover:bg-bg-light-hover-2 p-1 rounded-lg transition-colors'>
                <HiOutlinePlus size={18} /> Add
              </button>
            </Modal.Open>
          </>
        )}
      </ul>
    </section>
  );
};

export default ColumnBody;
