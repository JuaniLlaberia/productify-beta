import { useForm } from 'react-hook-form';
import { HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';

import Button from '../../../components/Button';
import SelectSingle from '../../../components/SelectCustom';
import { useCreateContent } from '../useCreateContent';

const NewTaskForm = ({
  onClose,
  status,
}: {
  onClose?: () => void;
  status: 'pending' | 'progress' | 'finished';
}) => {
  const { register, handleSubmit, setValue, watch } = useForm();

  const { addContent, isLoading } = useCreateContent();

  const handleNewTask = handleSubmit(({ title, content, importance, tag }) => {
    addContent(
      { title, content, status, importance: importance.value, tag: tag.value },
      {
        onSuccess: () => {
          if (onClose) onClose();
        },
      }
    );
  });

  return (
    <form onSubmit={handleNewTask} className='px-2'>
      <input
        disabled={isLoading}
        {...register('title', { required: 'required' })}
        className='bg-transparent font-semibold text-xl xl:text-5xl w-full border-none outline-none placeholder:text-text-light-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <textarea
        disabled={isLoading}
        {...register('content', { required: 'required' })}
        className='bg-transparent w-full h-[200px] resize-none mt-3 outline-none border-none lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'
        placeholder='Describe what needs to be done'
      />

      <SelectSingle
        options={[
          { label: 'Urgent', value: 'urgent' },
          { label: 'Important', value: 'important' },
          { label: 'Moderate', value: 'moderate' },
        ]}
        selectedOption={watch('importance') || ''}
        onChange={option => {
          setValue('importance', option);
        }}
        removeBorders
        placeholder='Select importance'
        icon={<HiOutlineCalendarDays />}
      />
      <SelectSingle
        options={[
          { label: 'New Feature', value: 'feature' },
          { label: 'Fix', value: 'fix' },
          { label: 'Refactor', value: 'refactor' },
          { label: 'Testing', value: 'testing' },
          { label: 'Documentation', value: 'documentation' },
          { label: 'Integration', value: 'integration' },
          { label: 'Deployment', value: 'deployment' },
          { label: 'Maintenance', value: 'maintenance' },
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
          disabled={isLoading}
          styleType='outline'
          onClick={e => {
            e.preventDefault();
            if (onClose) onClose();
          }}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading}>Add</Button>
      </div>
    </form>
  );
};

export default NewTaskForm;
