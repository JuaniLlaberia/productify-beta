import { HiOutlinePlus } from 'react-icons/hi2';

import Tag from './Tag';
import TaskCard from './TaskCard';
import Modal from '../../../components/Modal';
import NewTaskForm from './NewTaskForm';
import { useProjectContext } from '../../../context/ProjectContext';
import { PageContentType } from '../../../types/pagesTypes';

type ColumnType = {
  tag: 'pending' | 'progress' | 'finished';
  tasks: PageContentType[];
};

const TasksColumn = ({ tag, tasks }: ColumnType) => {
  const { isAdmin } = useProjectContext();

  return (
    <Modal>
      <section>
        <header className='bg-bg-light-1 flex justify-between items-center py-3 px-2'>
          <h3>
            <Tag
              label={tag}
              color={
                tag === 'pending'
                  ? 'red'
                  : tag === 'progress'
                  ? 'blue'
                  : 'green'
              }
            />
            <span className='text-text-light-2'>
              {!tasks?.length ? 0 : tasks?.length}
            </span>
          </h3>
          {isAdmin ? (
            <Modal.Open windowId='new-task-modal'>
              <button className='p-1 rounded-lg transition-colors md:hover:bg-bg-light-hover-2'>
                <HiOutlinePlus size={18} />
              </button>
            </Modal.Open>
          ) : null}
        </header>

        <ul className='flex flex-col gap-2 py-2 px-2 min-w-[325px]'>
          {tasks?.length >= 1 ? (
            tasks.map(task => <TaskCard key={task._id} task={task} />)
          ) : isAdmin ? (
            <Modal.Open windowId='new-task-modal'>
              <button className='flex items-center gap-2 w-full text-lg font-semibold text-text-light-2 md:hover:bg-bg-light-hover-2 p-1 rounded-lg transition-colors'>
                <HiOutlinePlus size={18} /> Add
              </button>
            </Modal.Open>
          ) : (
            <p className='text-center pt-3 text-text-light-2'>
              No tasks available
            </p>
          )}
        </ul>
      </section>

      <Modal.Window removeCloseBtn windowId='new-task-modal'>
        <NewTaskForm status={tag} />
      </Modal.Window>
    </Modal>
  );
};

export default TasksColumn;
