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
      className='relative h-full overflow-y-scroll scrollbar-none'
    >
      <input
        {...register('title', { required: 'required' })}
        autoFocus
        className='bg-transparent text-text-light-1 dark:text-text-dark-1 font-semibold mb-3 mt-4 text-xl xl:text-3xl w-full border-none outline-none placeholder:text-text-light-2 dark:placeholder:text-text-dark-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <TaskInfoOptions setValue={setValue} watch={watch} />
      <hr className='border-border-light dark:border-border-dark opacity-65' />
      <textarea
        maxLength={400}
        {...register('description', { required: 'required' })}
        className='bg-transparent text-text-light-1 dark:text-text-dark-1 w-full min-h-[200px] resize-none mt-3 outline-none border-none placeholder:text-text-light-2 dark:placeholder:text-text-dark-2'
        placeholder='Describe what needs to be done'
      />
      <hr className='mb-4 border-border-light dark:border-border-dark opacity-65' />
      <TaskInfoTasks tasks={defaultData?.subTasks!} setValue={setValue} />
      <hr className='mb-4 border-border-light dark:border-border-dark opacity-65' />
      <Button isLoading={isUpdating} full>
        Save changes
      </Button>
    </form>
  );
};

export default TaskCardInfo;
