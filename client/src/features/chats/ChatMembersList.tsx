import UserListSelect from '../../components/UserListSelect';
import { UserPreviewType } from '../../types/userTypes';

const ChatMembersList = ({
  members,
  selectedUsers,
  updateUsers,
}: {
  selectedUsers: string[];
  updateUsers: (users: string[]) => void;
  members: UserPreviewType[];
}) => {
  return (
    <>
      <UserListSelect
        users={members}
        selectedUsers={selectedUsers}
        onChange={updateUsers}
      />
      <p className='text-sm text-center mb-2 text-text-light-2 dark:text-text-dark-2 opacity-80'>
        Must select at least 2 users.
      </p>
    </>
  );
};

export default ChatMembersList;
