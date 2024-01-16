import { HiOutlineRocketLaunch, HiOutlineTrash } from 'react-icons/hi2';

import BtnMenu from '../../components/ButtonMenu';
import { useDeleteUserFromProject } from './useDeleteUserFromProject';
import { useUserContext } from '../../context/UserContext';
import { useToggleAdmin } from './useToggleAdmin';

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
    <tr className='relative bg-transparent border-b border-border-light dark:border-border-dark flex justify-between items-center py-8 dark:hover:bg-bg-light-hover-2 max-h-[40px]'>
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
        <BtnMenu>
          <BtnMenu.Toggle menuId='member-options' />
          <BtnMenu.Menu menuId='member-options'>
            <ul>
              <BtnMenu.Button
                onClick={() => toggleAdmin({ userId: _id })}
                icon={<HiOutlineRocketLaunch />}
              >
                {isAdmin ? 'Remove admin' : 'Make admin'}
              </BtnMenu.Button>
              <BtnMenu.Button
                onClick={() => deleteUser({ userId: _id })}
                icon={<HiOutlineTrash className='text-red-500' />}
              >
                <span className='text-red-500'>Remove user</span>
              </BtnMenu.Button>
            </ul>
          </BtnMenu.Menu>
        </BtnMenu>
      ) : null}
    </tr>
  );
};

export default MembersRow;
