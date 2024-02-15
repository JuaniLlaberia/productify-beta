import { HiOutlineEllipsisHorizontal, HiOutlineTrash } from 'react-icons/hi2';

import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import AddMembersBtn from '../features/chats/AddMembersBtn';
import MemberItem from './MemberItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';
import { SheetContent } from './Sheet';
import { useUserContext } from '../context/UserContext';
import { useProjectContext } from '../context/ProjectContext';
import { useAddUserToChat } from '../features/chats/useAddUserToChat';
import { useDeleteUserFromChat } from '../features/chats/useDeleteUserFromChat';
import { useDeleteChat } from '../features/chats/useDeleteChat';
import { useDeletePage } from '../features/pages/useDeletePage';
import { UserPreviewType } from '../types/userTypes';
import { useAddUsersToBoard } from '../features/pages/useAddUserToBoard';
import { useDeleteUserFromBoard } from '../features/pages/useDeleteUserFromBoard';

type TaskChatSheetType = {
  contentData: any;
  membersData: UserPreviewType[];
  type: 'chat' | 'board';
};

const TaskChatSheet = ({
  contentData,
  membersData,
  type,
}: TaskChatSheetType) => {
  //Common
  const { user } = useUserContext();
  const { isAdmin, projectData } = useProjectContext();

  //Tasks

  const { addUsersToBoard, isLoading: isAddingToBoard } = useAddUsersToBoard();
  const { removeUserFromBoard } = useDeleteUserFromBoard();
  const { deletePage: deleteBoard, isLoading: isDeletingBoard } =
    useDeletePage();

  //Chats
  const { addUsersToChat, isLoading: isAddingToChat } = useAddUserToChat();
  const { removeUserFromChat } = useDeleteUserFromChat();
  const { deleteChat, isLoading: isDeletingChat } = useDeleteChat();

  return (
    <SheetContent className='flex flex-col'>
      <section className='flex flex-col justify-center items-center pb-2'>
        <h1 className='flex items-center gap-1 text-2xl text-text-light-1 dark:text-text-dark-1'>
          {contentData?.name}
        </h1>
        <p className='text-sm text-text-light-2 dark:text-text-dark-2'>
          {membersData.length} members
        </p>
      </section>

      <section className='flex flex-col flex-grow py-2 px-6'>
        <h2 className='font-semibold text-sm text-text-light-2 dark:text-text-dark-2 mb-2'>
          Members
        </h2>
        {isAdmin ? (
          <AddMembersBtn
            addFn={type === 'chat' ? addUsersToChat : addUsersToBoard}
            loadingState={type === 'chat' ? isAddingToChat : isAddingToBoard}
            projectInfo={projectData}
            chatInfo={contentData}
          />
        ) : null}

        <ul>
          {membersData.map(member => (
            <MemberItem
              dropDownMenu={
                member._id !== user?.data?._id && isAdmin ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className='p-1 text-text-light-2 dark:text-text-dark-2 md:hover:rounded-md md:hover:bg-bg-light-hover-2 md:transition-colors'>
                      <HiOutlineEllipsisHorizontal size={22} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-1'>
                      <DropdownMenuItem
                        danger
                        icon={<HiOutlineTrash />}
                        onClick={() =>
                          type === 'chat'
                            ? removeUserFromChat({ userId: member._id! })
                            : removeUserFromBoard({ userId: member._id! })
                        }
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

      {isAdmin ? (
        <section className='py-2 px-6 w-full'>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                full
                styleType='danger'
              >
                Remove {type === 'chat' ? 'chat' : 'board'}
              </Button>
            </DialogTrigger>
            <DialogContent
              removeCloseBtn
              title='Delete board'
            >
              <ConfirmationModal
                action={() =>
                  type === 'chat'
                    ? deleteChat()
                    : deleteBoard({ pageId: contentData._id })
                }
                message={
                  type === 'chat'
                    ? 'Information and messages related to this chat will be deleted.'
                    : 'Information and tasks related to this board will be deleted.'
                }
                isLoading={type === 'chat' ? isDeletingChat : isDeletingBoard}
              />
            </DialogContent>
          </Dialog>
        </section>
      ) : null}
    </SheetContent>
  );
};

export default TaskChatSheet;
