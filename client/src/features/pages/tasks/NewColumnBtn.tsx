import { HiOutlinePlus } from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import CreateColumnForm from './CreateColumnForm';

const NewColumnBtn = () => {
  return (
    <li className='pr-6'>
      <Modal>
        <Modal.Open windowId='column-form'>
          <button className='flex justify-between items-center font-semibold bg-bg-light-1 my-4 mx-2 py-2 px-2 w-full min-w-[300px] max-w-[425px] hover:rounded-md hover:bg-bg-light-hover-2'>
            Add Column
            <span className='text-lg'>
              <HiOutlinePlus />
            </span>
          </button>
        </Modal.Open>
        <Modal.Window title='New Column' removeCloseBtn windowId='column-form'>
          <CreateColumnForm />
        </Modal.Window>
      </Modal>
    </li>
  );
};

export default NewColumnBtn;
