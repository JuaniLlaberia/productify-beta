import { HiOutlineChevronRight } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';

import { PageType } from '../../types/pagesTypes';

const BoardsList = ({ boards }: { boards: PageType[] }) => {
  const { projectId } = useParams();

  return (
    <>
      {boards.length > 0 ? (
        <ul className='w-full flex flex-col gap-2'>
          {boards.map(board => (
            <li key={board._id}>
              <Link
                to={`/project/${projectId}/${board._id}`}
                className='flex items-center justify-between bg-bg-light-2 dark:bg-bg-dark-2 border border-border-light dark:border-border-dark rounded-lg py-4 px-3 shadow-sm md:hover:bg-bg-light-hover-2 active:bg-bg-light-hover-2'
              >
                <h3 className='font-semibold text-text-light-1 dark:text-text-dark-1'>
                  {board.name}
                </h3>
                <button className='text-text-light-2 dark:text-text-dark-2'>
                  <HiOutlineChevronRight />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='py-4 text-text-light-2 dark:text-text-dark-2'>
          No boards
        </p>
      )}
    </>
  );
};

export default BoardsList;
