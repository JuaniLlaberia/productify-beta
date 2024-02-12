import { HiOutlineEllipsisHorizontal, HiOutlineTrash } from 'react-icons/hi2';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';
import { UserPreviewType } from '../../types/userTypes';
import { useDeleteUserFromChat } from './useDeleteUserFromChat';
import { useUserContext } from '../../context/UserContext';
import { useProjectContext } from '../../context/ProjectContext';

const ChatMemberItem = ({ memberData }: { memberData: UserPreviewType }) => {
  const { user } = useUserContext();
  const { isAdmin } = useProjectContext();
  const { removeUserFromChat, isLoading } = useDeleteUserFromChat();
  const { _id, firstName, lastName, email } = memberData;

  return (
    <li className='flex items-center justify-between'>
      <div className='flex gap-4 items-center py-2 font-medium text-text-light-1 whitespace-nowrap dark:text-text-dark-1'>
        <p className='w-10 h-10 bg-special-color rounded-full flex items-center justify-center text-white font-semibold'>
          J
        </p>
        <p className='flex flex-col justify-center items-start gap-0.5'>
          <span className='text-sm xl:text-base'>
            {firstName ? `${firstName} ${lastName}` : email}
          </span>
          <span className='text-xs text-text-light-2 dark:text-text-dark-2 opacity-80'>
            {email}
          </span>
        </p>
      </div>

      {_id !== user?.data?._id && isAdmin ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='p-1 text-text-light-2 dark:text-text-dark-2 md:hover:rounded-md md:hover:bg-bg-light-hover-2 md:transition-colors'>
            <HiOutlineEllipsisHorizontal size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-1'>
            <DropdownMenuItem
              disabled={isLoading}
              danger
              icon={<HiOutlineTrash />}
              onClick={() => removeUserFromChat({ userId: _id as string })}
            >
              Remove User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </li>
  );
};

export default ChatMemberItem;
