import { useForm } from 'react-hook-form';
import { HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';

import Button from '../../../components/Button';
import BtnsContainer from '../../../components/BtnsContainer';
import { useCreateTask } from '../useCreateTask';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';
import { DialogClose } from '../../../components/Dialog';

const NewEditTaskForm = ({ status }: { status: string }) => {
  const { register, handleSubmit, setValue, watch } = useForm();

  const { addTask, isLoading } = useCreateTask();

  const handleNewTask = handleSubmit(
    ({ title, description, importance, tag }) => {
      addTask({ title, description, status, importance, tag });
    }
  );

  return (
    <form
      onSubmit={handleNewTask}
      className='px-2'
    >
      <input
        type='text'
        disabled={isLoading}
        {...register('title', { required: 'required' })}
        className='bg-transparent text-text-light-1 dark:text-text-dark-1 font-semibold text-xl xl:text-3xl w-full border-none outline-none placeholder:text-text-light-2 dark:placeholder:text-text-dark-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <textarea
        maxLength={400}
        disabled={isLoading}
        {...register('description', { required: 'required' })}
        className='bg-transparent text-text-light-1 dark:text-text-dark-1 w-full h-[160px] resize-none mt-3 outline-none border-none placeholder:text-text-light-2 dark:placeholder:text-text-dark-2 lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'
        placeholder='Describe what needs to be done'
      />

      <Select
        required
        value={watch('importance')}
        onValueChange={val => setValue('importance', val)}
      >
        <SelectTrigger
          icon={<HiOutlineCalendarDays />}
          className='border-none shadow-none bg-transparent dark:bg-transparent px-0 pr-1'
        >
          <SelectValue placeholder='Select task importance' />
        </SelectTrigger>
        <SelectContent>
          {['urgent', 'important', 'moderate'].map(opt => (
            <SelectItem
              value={opt}
              key={opt}
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        required
        value={watch('tag')}
        onValueChange={val => setValue('tag', val)}
      >
        <SelectTrigger
          icon={<HiOutlineTag />}
          className='border-none shadow-none bg-transparent dark:bg-transparent px-0 pr-1 mt-1'
        >
          <SelectValue placeholder='Select task tag' />
        </SelectTrigger>
        <SelectContent>
          {[
            'feature',
            'fix',
            'refactor',
            'testing',
            'documentation',
            'integration',
            'deployment',
            'maintenance',
          ].map(opt => (
            <SelectItem
              value={opt}
              key={opt}
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <BtnsContainer>
        <DialogClose asChild>
          <Button
            disabled={isLoading}
            styleType='outline'
          >
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type='submit'
            isLoading={isLoading}
          >
            Add
          </Button>
        </DialogClose>
      </BtnsContainer>
    </form>
  );
};

export default NewEditTaskForm;
