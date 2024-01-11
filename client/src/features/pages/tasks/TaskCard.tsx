import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { TaskType } from './TasksBoard';

const TaskCard = ({ task }: { task: TaskType }) => {
  return (
    <li className='bg-bg-light-2 dark:bg-bg-dark-1 w-full p-2 border border-border-light dark:border-border-dark rounded-md shadow-md md:cursor-pointer md:hover:bg-bg-light-hover transition-colors'>
      <h4 className='flex justify-between items-center font-semibold py-1 text-text-light-1 dark:text-text-dark-1'>
        {task.title ? task.title : 'Untitled'}
        <span className='flex items-center gap-2 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 font-semibold me-2 px-4 py-1 rounded-lg shadow-sm'>
          <HiOutlineCalendarDays size={21} />
          01/11/24
        </span>
      </h4>
      <p className='text-text-light-2 dark:text-text-dark-2 pt-1 mt-1 line-clamp-3'>
        {task.content}
      </p>
      {task.comment ? (
        <div className='flex items-start mt-4'>
          <p className='bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-sm font-semibold me-2 px-4 py-1 rounded-lg shadow-sm'>
            {task.comment}
          </p>
        </div>
      ) : null}
    </li>
  );
};

export default TaskCard;
