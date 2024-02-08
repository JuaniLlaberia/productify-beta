import { useForm } from 'react-hook-form';

import TaskInfoTasks from './TaskInfoTasks';
import TaskInfoOptions from './TaskInfoOptions';
import Button from '../../../components/Button';
import { PageTaskType } from '../../../types/pagesTypes';
import { useUpdateTask } from '../useUpdateTask';

const TaskCardInfo = ({ defaultData }: { defaultData: PageTaskType }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultData,
  });

  const { editTask, isLoading: isUpdating } = useUpdateTask();

  const handleNewTask = handleSubmit(
    ({ title, description, importance, tag, status, subTasks }) => {
      editTask({
        task: {
          ...defaultData,
          title,
          description,
          status,
          importance,
          tag,
          subTasks,
        },
      });
    }
  );

  return (
    <form
      onSubmit={handleNewTask}
      className='relative h-full'
    >
      <input
        {...register('title', { required: 'required' })}
        autoFocus
        className='bg-transparent font-semibold mb-3 mt-4 text-xl xl:text-3xl w-full border-none outline-none placeholder:text-text-light-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <TaskInfoOptions
        setValue={setValue}
        watch={watch}
      />
      <hr className='text-text-light-2 opacity-65' />
      <textarea
        maxLength={400}
        {...register('description', { required: 'required' })}
        className='bg-transparent w-full min-h-[200px] resize-none mt-3 outline-none border-none'
        placeholder='Describe what needs to be done'
      />
      <hr className='mb-4 text-text-light-2 opacity-65' />
      <TaskInfoTasks
        tasks={defaultData?.subTasks!}
        setValue={setValue}
      />
      <div className='absolute w-full bottom-0 bg-bg-light-2'>
        <hr className='mb-4 text-text-light-2 opacity-65' />
        <Button
          isLoading={isUpdating}
          full
        >
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default TaskCardInfo;
