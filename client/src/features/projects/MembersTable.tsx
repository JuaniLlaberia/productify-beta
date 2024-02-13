import {
  HiOutlineEllipsisHorizontal,
  HiOutlineRocketLaunch,
  HiOutlineScissors,
  HiOutlineTrash,
} from 'react-icons/hi2';

import MemberItem from '../../components/MemberItem';
import { useProjectContext } from '../../context/ProjectContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';
import { useUserContext } from '../../context/UserContext';
import { useDeleteUserFromProject } from './useDeleteUserFromProject';
import { useToggleAdmin } from './useToggleAdmin';

const MembersTable = () => {
  const { user } = useUserContext();
  const { isAdmin, projectData } = useProjectContext();
  const { deleteUser } = useDeleteUserFromProject();
  const { toggleAdmin } = useToggleAdmin();

  return (
    <section className='flex flex-col flex-grow p-2'>
      <h2 className='font-semibold text-sm text-text-light-2 dark:text-text-dark-2 mb-2'>
        User Information
      </h2>
      <ul className='h-[400px] overflow-y-auto overflow-x-hidden lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'>
        {projectData.members.map(member => (
          <MemberItem
            border
            dropDownMenu={
              member._id !== user?.data?._id && isAdmin ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className='p-1 md:hover:rounded-md md:hover:bg-bg-light-hover-2 md:transition-colors'>
                    <HiOutlineEllipsisHorizontal size={22} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => toggleAdmin({ userId: member._id! })}
                      danger={projectData.admins.includes(member._id!)}
                      icon={
                        projectData.admins.includes(member._id!) ? (
                          <HiOutlineScissors />
                        ) : (
                          <HiOutlineRocketLaunch />
                        )
                      }
                    >
                      {projectData.admins.includes(member._id!)
                        ? 'Remove admin'
                        : 'Make admin'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      icon={<HiOutlineTrash />}
                      onClick={() => deleteUser({ userId: member._id! })}
                    >
                      Remove User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null
            }
            key={member._id}
            memberData={member}
          />
        ))}
      </ul>
    </section>
  );
};

export default MembersTable;
