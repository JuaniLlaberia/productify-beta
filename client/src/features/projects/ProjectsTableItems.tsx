import Tag from '../pages/tasks/Tag';
import { HiOutlineChevronRight, HiOutlineUserGroup } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

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
    <li className='dark'>
      <Link
        to={`/project/${id}/home`}
        className='relative bg-bg-light-contrast md:hover:bg-bg-dark-3 active:bg-bg-dark-1 flex gap-3.5 p-2 rounded-lg border border-border-dark transition-all'
      >
        <div className='bg-special-color w-20 h-20 md:w-28 md:h-28 rounded-md'></div>
        <section className='py-1'>
          <h3 className='font-semibold mb-1 text-text-dark-1 line-clamp-1 max-w-56 md:text-xl'>
            {name}
          </h3>
          <div className='flex gap-6 items-center mt-2'>
            <p className='flex gap-1 md:gap-1.5 items-center text-text-dark-2 text-xl md:text-2xl'>
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
          <span className='text-white text-lg md:text-3xl md:right-4 absolute right-2 top-[50%] translate-y-[-50%]'>
            <HiOutlineChevronRight />
          </span>
        </section>
      </Link>
    </li>
  );
};

export default ProjectsTableItems;
