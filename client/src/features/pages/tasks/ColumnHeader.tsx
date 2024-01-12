import { HiOutlinePlus } from 'react-icons/hi2';
import Modal from '../../../components/Modal';
import Tag from './Tag';

const ColumnHeader = ({
  tasksLength,
  tag,
}: {
  tasksLength: number;
  tag: 'Pending' | 'Process' | 'Finished';
}) => {
  return (
    <li className=' bg-bg-light-1 flex justify-between items-center py-3 px-2 w-full  min-w-[325px]'>
      <h3>
        <Tag
          label={tag}
          color={
            tag === 'Process' ? 'blue' : tag === 'Pending' ? 'red' : 'green'
          }
        />
        <span className='text-text-light-2'>{tasksLength}</span>
      </h3>
      <Modal.Open windowId='new-task-modal'>
        <button className='p-1 rounded-lg transition-colors md:hover:bg-bg-light-hover-2'>
          <HiOutlinePlus size={18} />
        </button>
      </Modal.Open>
    </li>
  );
};

export default ColumnHeader;
