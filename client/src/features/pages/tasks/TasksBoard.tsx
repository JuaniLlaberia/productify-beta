import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { useMemo } from 'react';

import Modal from '../../../components/Modal';
import TaskColumn from './TaskColumn';
import NewColumnBtn from './NewColumnBtn';
import { useGetPage } from '../useGetPage';
import { PageTaskType } from '../../../types/pagesTypes';
import { SkeletonTasks } from '../../../components/skeletons/SkeletonTasks';
import { ColorsType } from '../../../types/extraTypes';

const TasksBoard = () => {
  const { pageInfo, isLoading } = useGetPage();

  //Separating tasks based on status => memo for better performance
  const tasksByStatus = useMemo(() => {
    if (isLoading || !pageInfo) return {};

    return pageInfo?.tasks?.reduce((result, task) => {
      const status = task.status!;
      result[status] = result[status] || [];
      result[status].push(task);

      return result;
    }, {} as Record<string, PageTaskType[]>);
  }, [isLoading, pageInfo]);

  if (isLoading) return <SkeletonTasks />;

  return (
    <>
      <header className='flex items-center sticky left-0 md:block justify-between w-full p-4'>
        <h3 className='flex items-center gap-2'>
          <span className='text-2xl lg:text-3xl text-text-light-2 dark:text-text-dark-2'>
            <HiOutlineClipboardDocumentList />
          </span>
          <span className='text-xl xl:text-2xl font-semibold text-text-light-1 dark:text-text-dark-1'>
            {pageInfo?.name}
          </span>
        </h3>
      </header>

      <Modal>
        <ul className='flex w-full items-start gap-6'>
          {pageInfo?.columns.map(col => (
            <TaskColumn
              key={col._id}
              label={col.label}
              color={col.color as ColorsType}
              tasks={tasksByStatus[col.label] || []}
              id={col._id!}
            />
          ))}
          <NewColumnBtn />
        </ul>
      </Modal>
    </>
  );
};

export default TasksBoard;
