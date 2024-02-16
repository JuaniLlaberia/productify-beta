import { HiOutlineChevronRight, HiOutlineUserGroup } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import Tag from '../pages/tasks/Tag';

type ProjectItemType = {
  id: string;
  name: string;
  isCreator: boolean;
  members: number;
};

const ProjectsTableItems = ({
  id,
  name,
  isCreator,
  members,
}: ProjectItemType) => {
  return (
    <li>
      <Link
        to={`/project/${id}/home`}
        className='relative bg-bg-light-2 dark:bg-bg-dark-2  active:bg-bg-light-3 active:dark:bg-bg-dark-1 flex p-2 rounded-lg border border-border-light dark:border-border-dark transition-all shadow-sm'
      >
        <section className='py-2 pl-4'>
          <h2 className='font-semibold mb-1 text-text-light-1 dark:text-text-dark-1 line-clamp-1 max-w-56 md:text-xl'>
            {name}
          </h2>
          <div className='flex gap-6 items-center mt-2'>
            <p className='flex gap-1 md:gap-1.5 items-center text-text-light-2 dark:text-text-dark-2 text-xl md:text-2xl'>
              <HiOutlineUserGroup />
              <span className='font-medium text-base md:text-lg'>
                {members}
              </span>
            </p>
            {isCreator ? (
              <Tag
                label='Owner'
                color='red'
              />
            ) : (
              <Tag
                label='Member'
                color='yellow'
              />
            )}
          </div>
          <span className='text-text-light-1 dark:text-text-dark-1 text-lg md:text-3xl md:right-4 absolute right-2 top-[50%] translate-y-[-50%]'>
            <HiOutlineChevronRight />
          </span>
        </section>
      </Link>
    </li>
  );
};

export default ProjectsTableItems;
