import { HiOutlineUserGroup } from 'react-icons/hi2';
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
    <li>
      <Link
        to={`/project/${id}`}
        className='relative bg-bg-light-contrast flex gap-3.5 p-2 rounded-lg hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform'
      >
        <div className='bg-special-color w-20 h-20 rounded-md'></div>
        <section className='py-1'>
          <h3 className='font-semibold mb-1 text-text-dark-1 line-clamp-1 max-w-56'>
            {name}
          </h3>
          <div className='flex gap-6 items-center mt-2'>
            <p className='flex gap-1 items-center text-text-dark-2'>
              <HiOutlineUserGroup size={20} />
              <span className='font-medium'>{members}</span>
            </p>
            {isCreator ? (
              <span className='text-xs flex items-center justify-center px-2.5 py-1 rounded-full bg-yellow-900 text-yellow-300'>
                Creator
              </span>
            ) : (
              <span className='text-xs flex items-center justify-center px-2.5 py-1 rounded-full bg-gray-700 text-gray-300'>
                Member
              </span>
            )}
          </div>
        </section>
      </Link>
    </li>
  );
};

export default ProjectsTableItems;
