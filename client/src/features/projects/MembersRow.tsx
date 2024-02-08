import {
  HiOutlineEllipsisHorizontal,
  HiOutlineRocketLaunch,
  HiOutlineScissors,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { useDeleteUserFromProject } from './useDeleteUserFromProject';
import { useUserContext } from '../../context/UserContext';
import { useToggleAdmin } from './useToggleAdmin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';

type UserPreviewType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  authIsAdmin: boolean;
  img?: string;
};

const MembersRow = ({
  name,
  email,
  _id,
  img,
  isAdmin,
  authIsAdmin,
}: UserPreviewType) => {
  const { user } = useUserContext();
  const { deleteUser } = useDeleteUserFromProject();
  const { toggleAdmin } = useToggleAdmin();

  return (
    <tr className='relative bg-transparent border-b border-border-light dark:border-border-dark flex justify-between items-center py-8 hover:bg-bg-light-hover-2 max-h-[40px]'>
      <th
        scope='row'
        className='flex gap-3 items-center px-3 py-4 font-medium text-text-light-1 whitespace-nowrap dark:text-text-dark-1'
      >
        <p className='w-8 h-8 bg-special-color rounded-full flex items-center justify-center text-white font-semibold'>
          J
        </p>
        <p className='flex flex-col justify-center items-start gap-0.5'>
          <span>{name === 'undefined undefined' ? email : name}</span>
          <span className='text-xs text-text-light-2 dark:text-text-dark-2 opacity-80'>
            {email}
          </span>
        </p>
      </th>
      {_id !== user?.data?._id && authIsAdmin ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='p-1 md:hover:rounded-md md:hover:bg-bg-light-hover-2 md:transition-colors'>
            <HiOutlineEllipsisHorizontal size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => toggleAdmin({ userId: _id })}
              danger={isAdmin}
              icon={isAdmin ? <HiOutlineScissors /> : <HiOutlineRocketLaunch />}
            >
              {isAdmin ? 'Remove admin' : 'Make admin'}
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={<HiOutlineTrash />}
              onClick={() => deleteUser({ userId: _id })}
            >
              Remove User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </tr>
  );
};

export default MembersRow;
