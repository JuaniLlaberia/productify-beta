import { useMemo } from 'react';

import Modal from '../../../components/Modal';
import TaskColumn from './TaskColumn';
import NewColumnBtn from './NewColumnBtn';
import TaskBoardHeader from './TaskBoardHeader';
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
      <TaskBoardHeader pageInfo={pageInfo!} />
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
