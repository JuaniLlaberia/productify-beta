import { useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import Input from './Input';
import UserListSelectItem from './UserListSelectItem';

type UserListType = {
  users: UserPreviewType[];
  selectedUsers: string[];
  onChange: (users: string[]) => void;
};

const UserListSelect = ({ users, selectedUsers, onChange }: UserListType) => {
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(
    user =>
      user?.email?.toLowerCase().includes(filter.toLowerCase()) ||
      user?.fullName?.toLowerCase().includes(filter.toLowerCase())
  );

  const selectUser = (userId: string) => {
    const updatedSelection = [...selectedUsers, userId];
    onChange(updatedSelection);
  };

  const unSelectUser = (userId: string) => {
    const updatedSelection = [...selectedUsers].filter(el => el !== userId);
    onChange(updatedSelection);
  };

  return (
    <>
      <Input
        placeholder='Search members'
        value={filter}
        onChange={e => setFilter(e.target.value)}
        icon={<HiOutlineMagnifyingGlass />}
      />
      <ul className='mb-3 h-[300px] overflow-y-scroll overflow-x-hidden'>
        {filteredUsers.map(user => (
          <UserListSelectItem
            key={user._id}
            _id={user._id}
            fullName={user.fullName}
            profileImg={user.profileImg}
            email={user.email}
            onChange={
              selectedUsers.includes(user._id) ? unSelectUser : selectUser
            }
            checked={selectedUsers.includes(user._id)}
          />
        ))}
      </ul>
    </>
  );
};

export default UserListSelect;
