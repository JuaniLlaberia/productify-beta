import { useForm } from 'react-hook-form';
import { HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';

import Button from '../../../components/Button';
import SelectCustom from '../../../components/SelectCustom';
import { useCreateContent } from '../useCreateContent';
import { PageContentType } from '../../../types/pagesTypes';
import { useUpdateContent } from '../useUpdateContent';

const NewEditTaskForm = ({
  onClose,
  status,
  defaultData,
}: {
  onClose?: () => void;
  status: 'pending' | 'progress' | 'finished';
  defaultData?: PageContentType;
}) => {
  const isEditMode = Boolean(defaultData?._id);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: isEditMode ? defaultData : {},
  });

  const { addContent, isLoading } = useCreateContent();
  const { editContent, isLoading: isUpdating } = useUpdateContent();

  const handleNewTask = handleSubmit(({ title, content, importance, tag }) => {
    if (!isEditMode) {
      addContent(
        { title, content, status, importance, tag },
        {
          onSuccess: () => {
            if (onClose) onClose();
          },
        }
      );
    } else {
      editContent(
        { content: { ...defaultData, title, content, importance, tag } },
        {
          onSuccess: () => {
            if (onClose) onClose();
          },
        }
      );
    }
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
