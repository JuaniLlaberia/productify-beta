import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { useMemo } from 'react';

import TasksColumn from './TasksColumn';
import Modal from '../../../components/Modal';
import ColumnHeader from './ColumnHeader';
import NewTaskForm from './NewTaskForm';
import { useGetPage } from '../useGetPage';
import { PageContentType } from '../../../types/pagesTypes';
import { SkeletonTasks } from '../../../components/skeletons/SkeletonTasks';

const TasksBoard = () => {
  const { pageInfo, isLoading } = useGetPage();

  //Separating tasks based on status => memo for better performance
  const tasksByStatus = useMemo(() => {
    if (isLoading || !pageInfo) return {};

    return pageInfo?.content?.reduce((result, task) => {
      const status = task.status!;
      result[status] = result[status] || [];
      result[status].push(task);

      return result;
    }, {} as Record<string, PageContentType[]>);
  }, [isLoading, pageInfo]);

  if (isLoading) return <SkeletonTasks />;

  const pendingTasks = (tasksByStatus?.pending as PageContentType[]) || [];
  const progressTasks = (tasksByStatus?.progress as PageContentType[]) || [];
  const finishedTasks = (tasksByStatus?.finished as PageContentType[]) || [];

  return (
    <>
      <header className='flex items-center sticky left-0 md:block justify-between w-full p-4'>
        <h3 className='flex items-center gap-2'>
          <span className='text-2xl lg:text-3xl text-text-light-2'>
            <HiOutlineClipboardDocumentList />
          </span>
          <span className='text-xl xl:text-2xl font-semibold'>
            {pageInfo?.name}
          </span>
        </h3>
      </header>
      <Modal>
        <section className='w-full sticky -top-5'>
          <ul className='gap-6 bg-bg-light-1 flex justify-between items-center py-3'>
            <ColumnHeader tasksLength={pendingTasks.length} tag='Pending' />
            <ColumnHeader tasksLength={progressTasks.length} tag='Process' />
            <ColumnHeader tasksLength={finishedTasks.length} tag='Finished' />
          </ul>
        </section>
        <section className='flex gap-6 md:gap-2 2xl:gap-4 w-full h-full'>
          <TasksColumn tasks={pendingTasks} />
          <TasksColumn tasks={progressTasks} />
          <TasksColumn tasks={finishedTasks} />
        </section>
        <Modal.Window removeCloseBtn windowId='new-task-modal'>
          <NewTaskForm status={'pending'} />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default TasksBoard;
