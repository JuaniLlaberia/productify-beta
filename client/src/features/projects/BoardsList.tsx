import { HiOutlineChevronRight, HiOutlineSquares2X2 } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';

import { PageType } from '../../types/pagesTypes';

const BoardsList = ({ boards }: { boards: PageType[] }) => {
  const { projectId } = useParams();

  return (
    <>
      {boards.length > 0 ? (
        <ul className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
          {boards.map(board => (
            <li
              key={board._id}
              className='w-full'
            >
              <Link
                to={`/project/${projectId}/${board._id}`}
                className='flex items-center justify-between bg-bg-light-2 dark:bg-bg-dark-2 border border-border-light dark:border-border-dark rounded-lg py-4 px-3 shadow-sm md:hover:bg-bg-light-hover-2 active:bg-bg-light-hover-2'
              >
                <div className='flex items-center gap-3'>
                  <div className='bg-[#9a989820] p-2 rounded-lg text-text-light-2 dark:text-text-dark-2'>
                    <HiOutlineSquares2X2 size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-text-light-1 dark:text-text-dark-1'>
                      {board.name}
                    </h3>
                    <p className='text-text-light-2 dark:text-text-dark-2 text-sm'>
                      {board.tasksCount} tasks
                    </p>
                  </div>
                </div>
                <button className='text-text-light-2 dark:text-text-dark-2'>
                  <HiOutlineChevronRight />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='py-4 text-center text-sm text-text-light-2 dark:text-text-dark-2'>
          No boards
        </p>
      )}
    </>
  );
};

export default BoardsList;
