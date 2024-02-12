import { HiUserPlus } from 'react-icons/hi2';
import { useMemo, useState } from 'react';

import UserListSelect from '../../components/UserListSelect';
import Button from '../../components/Button';
import { useAddUserToChat } from './useAddUserToChat';
import { Dialog, DialogContent, DialogTrigger } from '../../components/Dialog';
import type { ChatType, ProjectInfoType } from '../../types/projectTypes';

const AddMembersBtn = ({
  projectInfo,
  chatInfo,
}: {
  projectInfo: ProjectInfoType;
  chatInfo: ChatType;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { addUsersToChat, isLoading: isLoadingTwo } = useAddUserToChat();

  //Only show users that are not already members of current chat
  const usersAvailableToAdd = useMemo(() => {
    return projectInfo.members.filter(
      member => !chatInfo.members.includes(member._id as string)
    );
  }, [projectInfo.members]);

  const updateSelectedUsers = (users: string[]) => {
    setSelectedUsers(users);
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DialogTrigger>
        <button className='flex items-center gap-4 py-2 w-full rounded-lg md:hover:bg-bg-light-hover-2 transition-colors'>
          <span className='flex justify-center items-center bg-special-color w-10 h-10 rounded-full text-text-dark-1'>
            <HiUserPlus size={26} />
          </span>
          Add members
        </button>
      </DialogTrigger>
      <DialogContent removeCloseBtn>
        <UserListSelect
          users={usersAvailableToAdd}
          onChange={updateSelectedUsers}
          selectedUsers={selectedUsers}
        />
        <Button
          isLoading={isLoadingTwo}
          full
          onClick={() =>
            addUsersToChat(
              { users: selectedUsers },
              { onSuccess: () => setIsModalOpen(false) }
            )
          }
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddMembersBtn;
