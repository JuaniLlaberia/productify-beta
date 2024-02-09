import {
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineTag,
} from 'react-icons/hi2';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import TaskInfoOptionsItem from './TaskInfoOptionsItem';
import type { PageTaskType, PageType } from '../../../types/pagesTypes';

const TaskInfoOptions = ({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<PageTaskType>;
  watch: UseFormWatch<PageTaskType>;
}) => {
  const queryClient = useQueryClient();
  const { pageId } = useParams();

  const cachePageData = queryClient.getQueryData([
    'page-info',
    pageId,
  ]) as PageType;

  const allPageStatus = useMemo(
    () => cachePageData.columns.map(status => status.label),
    [cachePageData]
  );

  return (
    <ul className='px-2 py-3'>
      <li>
        <TaskInfoOptionsItem
          label='Status'
          icon={<HiOutlineSparkles size={18} />}
          value={watch('status') || ''}
          onChangeFn={val => setValue('status', val)}
          options={allPageStatus}
        />
      </li>
      <li>
        <TaskInfoOptionsItem
          label='Importance'
          icon={<HiOutlineCalendarDays size={18} />}
          value={watch('importance') || ''}
          onChangeFn={val => setValue('importance', val)}
          options={['urgent', 'important', 'moderate']}
        />
      </li>
      <li>
        <TaskInfoOptionsItem
          label='Tag'
          icon={<HiOutlineTag size={18} />}
          value={watch('tag') || ''}
          onChangeFn={val => setValue('tag', val)}
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
        />
      </li>
    </ul>
  );
};

export default TaskInfoOptions;
