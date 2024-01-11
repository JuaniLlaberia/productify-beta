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

  const { pending, progress, finished } = Object.groupBy(
    pageInfo?.content,
    ({ status }: { status: 'pending' | 'process' | 'finished' }) => status
  );

  return (
    <>
      <header className='flex items-center justify-between w-full p-4 mb-4'>
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
        <section className='flex gap-10 w-full h-full'>
          <TasksColumn tag='pending' tasks={pending} />
          <TasksColumn tag='progress' tasks={progress} />
          <TasksColumn tag='finished' tasks={finished} />
        </section>
      </DndContext>
    </>
  );
};

export default TasksBoard;
