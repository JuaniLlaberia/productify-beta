import { useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import Input from './Input';
import UserListSelectItem from './UserListSelectItem';
import { UserPreviewType } from '../types/userTypes';

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
      user?.firstName?.toLowerCase().includes(filter.toLowerCase()) ||
      user?.lastName?.toLowerCase().includes(filter.toLowerCase())
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
      <ul className='mb-3 h-[300px] overflow-y-auto overflow-x-hidden lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserListSelectItem
              key={user._id}
              _id={user._id}
              lastName={user.firstName}
              firstName={user.lastName}
              profileImg={user.profileImg}
              email={user.email}
              onChange={
                selectedUsers.includes(user._id!) ? unSelectUser : selectUser
              }
              checked={selectedUsers.includes(user._id!)}
            />
          ))
        ) : (
          <li>
            <p className='text-center text-sm py-6 text-text-light-2 dark:text-text-dark-2'>
              No users found
            </p>
          </li>
        )}
      </ul>
    </>
  );
};

export default UserListSelect;
