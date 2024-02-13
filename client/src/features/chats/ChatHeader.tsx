import { useMemo } from 'react';
import {
  HiOutlineCog6Tooth,
  HiOutlineEllipsisHorizontal,
  HiOutlineHashtag,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useParams } from 'react-router';

import AddMembersBtn from './AddMembersBtn';
import MemberItem from '../../components/MemberItem';
import Button from '../../components/Button';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useProjectContext } from '../../context/ProjectContext';
import { useDeleteChat } from './useDeleteChat';
import { Sheet, SheetContent, SheetTrigger } from '../../components/Sheet';
import { Dialog, DialogContent, DialogTrigger } from '../../components/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';
import { useUserContext } from '../../context/UserContext';
import { useDeleteUserFromChat } from './useDeleteUserFromChat';

const ChatHeader = () => {
  const { chatId } = useParams();
  const { deleteChat, isLoading } = useDeleteChat();
  const { user } = useUserContext();
  const { projectData, isAdmin } = useProjectContext();
  const { removeUserFromChat, isLoading: isDeleting } = useDeleteUserFromChat();

  const chatInfo = projectData.chats.filter(chat => chat._id === chatId)[0];

  const chatMembersData = useMemo(
    () =>
      projectData.members.filter(member =>
        chatInfo.members.includes(member._id!)
      ),
    [projectData.members, chatInfo.members]
  );

  return (
    <Sheet>
      <header className='flex items-center justify-between'>
        <h3 className='flex items-center gap-2 font-semibold text-text-light-1 dark:text-text-dark-1 xl:text-xl'>
          <HiOutlineHashtag />
          {chatInfo.name}
        </h3>
        <SheetTrigger asChild>
          <button className='flex items-center gap-1 xl:text-lg text-text-light-2 dark:text-text-dark-2 py-1 px-2 hover:bg-bg-light-hover-2 hover:rounded-lg transition-colors'>
            <HiOutlineCog6Tooth size={20} />
            Chat settings
          </button>
        </SheetTrigger>
      </header>

      <SheetContent
        title='Chat information'
        className='flex flex-col'
      >
        <section className='flex flex-col justify-center items-center pb-2'>
          <h1 className='flex items-center gap-1 text-2xl text-text-light-1 dark:text-text-dark-1'>
            <HiOutlineHashtag />
            {chatInfo.name}
          </h1>
          <p className='text-sm text-text-light-2 dark:text-text-dark-2'>
            {chatInfo.members.length} members
          </p>
        </section>
        <section className='flex flex-col flex-grow py-2 px-6'>
          <h2 className='font-semibold text-sm text-text-light-2 dark:text-text-dark-2 mb-2'>
            Members
          </h2>
          {isAdmin ? (
            <AddMembersBtn
              projectInfo={projectData}
              chatInfo={chatInfo}
            />
          ) : null}
          <ul>
            {chatMembersData.map(member => (
              <MemberItem
                dropDownMenu={
                  member._id !== user?.data?._id && isAdmin ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className='p-1 text-text-light-2 dark:text-text-dark-2 md:hover:rounded-md md:hover:bg-bg-light-hover-2 md:transition-colors'>
                        <HiOutlineEllipsisHorizontal size={22} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='mr-1'>
                        <DropdownMenuItem
                          disabled={isDeleting}
                          danger
                          icon={<HiOutlineTrash />}
                          onClick={() =>
                            removeUserFromChat({ userId: member._id as string })
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
                  Remove chat
                </Button>
              </DialogTrigger>
              <DialogContent
                removeCloseBtn
                title='Delete chat'
              >
                <ConfirmationModal
                  action={deleteChat}
                  message='Information and messages related to this chat will be deleted.'
                  isLoading={isLoading}
                />
              </DialogContent>
            </Dialog>
          </section>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default ChatHeader;
