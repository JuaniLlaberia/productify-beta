import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import Progress from '../../../components/Progress';
import { Checkbox } from '../../../components/Checkbox';
import type { PageTaskType, SubTaskType } from '../../../types/pagesTypes';

type TasksType = {
  tasks: SubTaskType[];
  setValue: UseFormSetValue<PageTaskType>;
};

const TaskInfoTasks = ({ tasks, setValue }: TasksType) => {
  const [crrTasks, setCrrTasks] = useState(tasks);
  const completedTasks = crrTasks.filter(task => task?.completed).length;

  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...crrTasks];
    updatedTasks[index] = { ...updatedTasks[index], title: value };
    setCrrTasks(updatedTasks);
    setValue('subTasks', updatedTasks);
  };

  const handleTaskToggle = (index: number) => {
    const updatedTasks = [...crrTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setCrrTasks(updatedTasks);
    setValue('subTasks', updatedTasks);
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const newTask: SubTaskType = {
        title: e.currentTarget.value,
        completed: false,
      };

      setCrrTasks(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];
        setValue('subTasks', updatedTasks);

        return updatedTasks;
      });
      e.currentTarget.value = '';
    }
  };

  return (
    <section className='pb-4'>
      <h3 className='text-xl font-semibold mb-3 text-text-light-1 dark:text-text-dark-1'>
        Tasks
      </h3>
      {crrTasks.length >= 1 ? (
        <Progress
          value={completedTasks}
          total={crrTasks.length}
        />
      ) : null}

      <ul className='flex flex-col gap-1 mt-3 overflow-y-auto min-h-[75px]'>
        {crrTasks.map((task, i) => (
          <li
            key={i}
            className='flex items-center gap-2'
          >
            <Checkbox
              defaultChecked={task?.completed}
              onCheckedChange={() => handleTaskToggle(i)}
            />
            <input
              defaultValue={task.title}
              className={`text-text-light-1 dark:text-text-dark-1 ${
                task.completed ? 'line-through' : 'no-underline'
              } w-full bg-transparent border-none outline-none`}
              onChange={e => handleTaskChange(i, e.target.value)}
            />
          </li>
        ))}

        <li>
          <input
            type='text'
            placeholder='+ Add new tasks'
            className='bg-transparent border-none outline-none text-text-light-1 dark:text-text-dark-1 placeholder:text-text-light-2 dark:placeholder:text-text-dark-2'
            onKeyDown={handleAddTask}
          />
        </li>
      </ul>
    </section>
  );
};

export default TaskInfoTasks;
