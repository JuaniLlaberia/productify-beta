import { HiOutlinePlus } from 'react-icons/hi2';

import CreateColumnForm from './CreateColumnForm';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/Dialog';

const NewColumnBtn = () => {
  return (
    <li className='pr-6'>
      <Dialog>
        <DialogTrigger asChild>
          <button className='flex justify-between items-center font-semibold bg-transparent text-text-light-1 dark:text-text-dark-1 my-4 mx-2 py-2 px-2 w-full min-w-[300px] max-w-[425px] hover:rounded-md hover:bg-bg-light-hover-2'>
            Add Column
            <span className='text-lg'>
              <HiOutlinePlus />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent
          title='New Column'
          removeCloseBtn
        >
          <CreateColumnForm />
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default NewColumnBtn;
