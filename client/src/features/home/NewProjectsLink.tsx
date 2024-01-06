import { HiOutlinePlus } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const NewProjectsLink = () => {
  return (
    <Link
      to='/project/new'
      className='flex items-center justify-center gap-1 bg-bg-light-contrast text-text-dark-1 mb-2 py-2 md:py-4 rounded-lg md:h-full md:hover:bg-bg-dark-3 active:bg-bg-dark-1'
    >
      <span className='text-xl md:text-4xl text-special-color'>
        <HiOutlinePlus />
      </span>
      <span className='text-lg font-semibold md:text-xl'>New Project</span>
    </Link>
  );
};

export default NewProjectsLink;
