import Tag from './Tag';
import { PageContentType } from '../../../types/pagesTypes';

const TaskCard = ({ task }: { task: PageContentType }) => {
  return (
    <li className='bg-bg-light-2 dark:bg-bg-dark-1 w-full min-w-[300px] p-2 border border-border-light dark:border-border-dark rounded-md shadow-md md:cursor-pointer md:hover:bg-bg-light-hover transition-colors'>
      <h4 className='flex justify-between items-center font-semibold py-1 text-text-light-1 dark:text-text-dark-1 2xl:text-lg'>
        {task.title ? task.title : 'Untitled'}
        <Tag
          label={task.importance as string}
          color={`${
            task.importance === 'important'
              ? 'orange'
              : task.importance === 'urgent'
              ? 'red'
              : 'gray'
          }`}
        />
      </h4>
      <p className='text-text-light-2 mb-4 dark:text-text-dark-2 pt-1 mt-1 line-clamp-3'>
        {task.content}
      </p>
      {task.tag ? <Tag label={task.tag} color='purple' /> : null}
    </li>
  );
};

export default TaskCard;
