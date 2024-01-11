import { useForm } from 'react-hook-form';

import Button from '../../../components/Button';
import { useCreateContent } from '../useCreateContent';

const NewTaskForm = ({
  onClose,
  status,
}: {
  onClose?: () => void;
  status: 'pending' | 'progress' | 'finished';
}) => {
  const { register, handleSubmit } = useForm();

  const { addContent, isLoading } = useCreateContent();

  const handleNewTask = handleSubmit(({ title, content }) => {
    addContent(
      { title, content, status },
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
        className='font-semibold text-5xl w-full border-none outline-none placeholder:text-text-light-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <textarea
        disabled={isLoading}
        {...register('content', { required: 'required' })}
        className='w-full h-[200px] resize-none mt-3 outline-none border-none lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'
        placeholder='Describe what needs to be done'
      />
      <div>//TAG //CALENDAR</div>
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
