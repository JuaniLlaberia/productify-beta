import { DndContext } from '@dnd-kit/core';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

import TasksColumn from './TasksColumn';
import { useGetPage } from '../useGetPage';
import { SkeletonTasks } from '../../../components/skeletons/skeletonTasks';

export type TaskType = {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  comment: string;
  status: 'pending' | 'process' | 'finished';
  dueDate: Date;
};

const TasksBoard = () => {
  const { pageInfo, isLoading } = useGetPage();

  if (isLoading) return <SkeletonTasks />;

  const pendingTasks = pageInfo?.content?.filter(
    task => task.status === 'pending'
  ) as TaskType[];
  const progressTasks = pageInfo?.content?.filter(
    task => task.status === 'progress'
  ) as TaskType[];
  const finishedTasks = pageInfo?.content?.filter(
    task => task.status === 'finished'
  ) as TaskType[];

  return (
    <>
      <header className='flex items-center sticky left-0 md:block justify-between w-full p-4 mb-4'>
        <h3 className='flex items-center gap-2'>
          <span className='text-2xl lg:text-4xl text-text-light-2'>
            <HiOutlineClipboardDocumentList />
          </span>
          <span className='text-xl lg:text-3xl font-semibold'>
            {pageInfo?.name}
          </span>
        </h3>
      </header>

      <DndContext>
        <section className='flex gap-6 md:gap-2 xl:gap-10 w-full h-full'>
          <TasksColumn tag='pending' tasks={pendingTasks} />
          <TasksColumn tag='progress' tasks={progressTasks} />
          <TasksColumn tag='finished' tasks={finishedTasks} />
        </section>
      </DndContext>
    </>
  );
};

export default TasksBoard;
