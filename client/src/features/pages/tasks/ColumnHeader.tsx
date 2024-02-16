import { HiOutlinePlus } from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import Tag from './Tag';
import { ColorsType } from '../../../types/extraTypes';
import { DialogTrigger } from '../../../components/Dialog';

const ColumnHeader = ({
  tasksLength,
  label,
  color,
  id,
}: {
  id: string;
  tasksLength: number;
  label: string;
  color: ColorsType;
}) => {
  return (
    <header className=' bg-bg-light-1 dark:bg-bg-dark-1 flex justify-between items-center py-3 px-2 w-full min-w-[325px]'>
      <h3>
        <Tag
          label={label}
          color={color}
        />
        <span className='text-text-light-2 dark:text-text-dark-2'>
          {tasksLength}
        </span>
      </h3>
      <DialogTrigger asChild>
        <button
          aria-label='Open modal'
          className='p-1 text-text-light-1 dark:text-text-dark-1 rounded-lg transition-colors md:hover:bg-bg-light-hover-2'
        >
          <HiOutlinePlus size={18} />
        </button>
      </DialogTrigger>
    </header>
  );
};

export default ColumnHeader;
