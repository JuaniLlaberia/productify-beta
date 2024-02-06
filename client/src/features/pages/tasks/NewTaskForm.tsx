import { useForm } from 'react-hook-form';
import { HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';

import Button from '../../../components/Button';
import SelectCustom from '../../../components/SelectCustom';
import { useCreateTask } from '../useCreateTask';
import { PageTaskType } from '../../../types/pagesTypes';
import { useUpdateTask } from '../useUpdateTask';

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
        className='bg-transparent font-semibold text-xl xl:text-5xl w-full border-none outline-none placeholder:text-text-light-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <textarea
        disabled={isLoading}
        {...register('description', { required: 'required' })}
        className='bg-transparent w-full h-[200px] resize-none mt-3 outline-none border-none lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'
        placeholder='Describe what needs to be done'
      />

      <SelectCustom
        options={['urgent', 'important', 'moderate']}
        selectedOption={watch('importance') || ''}
        onChange={option => {
          setValue('importance', option);
        }}
        removeBorders
        placeholder='Select importance'
        icon={<HiOutlineCalendarDays />}
      />
      <SelectCustom
        options={[
          'feature',
          'fix',
          'refactor',
          'testing',
          'documentation',
          'integration',
          'deployment',
          'maintenance',
        ]}
        selectedOption={watch('tag') || ''}
        onChange={option => {
          setValue('tag', option);
        }}
        removeBorders
        placeholder='Select task tag'
        icon={<HiOutlineTag />}
      />

      <div className='flex justify-between mt-10'>
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
      </div>
    </form>
  );
};

export default NewEditTaskForm;
