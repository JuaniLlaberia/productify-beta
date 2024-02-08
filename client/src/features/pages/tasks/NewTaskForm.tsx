import { useForm } from 'react-hook-form';
import { HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';

import Button from '../../../components/Button';
import { useCreateTask } from '../useCreateTask';
import { PageTaskType } from '../../../types/pagesTypes';
import { useUpdateTask } from '../useUpdateTask';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';
import BtnsContainer from '../../../components/BtnsContainer';

const NewEditTaskForm = ({
  onClose,
  status,
  defaultData,
}: {
  onClose?: () => void;
  status: string;
  defaultData?: PageTaskType;
}) => {
  const isEditMode = Boolean(defaultData?._id);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: isEditMode ? defaultData : {},
  });

  const { addTask, isLoading } = useCreateTask();
  const { editTask, isLoading: isUpdating } = useUpdateTask();

  const handleNewTask = handleSubmit(
    ({ title, description, importance, tag }) => {
      if (!isEditMode) {
        addTask(
          { title, description, status, importance, tag },
          {
            onSuccess: () => {
              if (onClose) onClose();
            },
          }
        );
      } else {
        editTask(
          { task: { ...defaultData, title, description, importance, tag } },
          {
            onSuccess: () => {
              if (onClose) onClose();
            },
          }
        );
      }
    }
  );

  return (
    <form
      onSubmit={handleNewTask}
      className='px-2'
    >
      <input
        disabled={isLoading}
        {...register('title', { required: 'required' })}
        className='bg-transparent font-semibold text-xl xl:text-3xl w-full border-none outline-none placeholder:text-text-light-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <textarea
        maxLength={400}
        disabled={isLoading}
        {...register('description', { required: 'required' })}
        className='bg-transparent w-full h-[160px] resize-none mt-3 outline-none border-none lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'
        placeholder='Describe what needs to be done'
      />

      <Select
        required
        value={watch('importance') || ''}
        onValueChange={val => setValue('importance', val)}
      >
        <SelectTrigger
          icon={<HiOutlineCalendarDays />}
          className='border-none shadow-none bg-transparent px-0 pr-1'
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
        value={watch('tag') || ''}
        onValueChange={val => setValue('tag', val)}
      >
        <SelectTrigger
          icon={<HiOutlineTag />}
          className='border-none shadow-none bg-transparent px-0 pr-1 mt-1'
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
        <Button
          disabled={isLoading || isUpdating}
          styleType='outline'
          onClick={e => {
            e.preventDefault();
            if (onClose) onClose();
          }}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading || isUpdating}>Add</Button>
      </BtnsContainer>
    </form>
  );
};

export default NewEditTaskForm;
