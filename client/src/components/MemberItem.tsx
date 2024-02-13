import { UserPreviewType } from '../types/userTypes';
import { ReactNode } from 'react';

const MemberItem = ({
  memberData,
  dropDownMenu,
  border,
}: {
  memberData: UserPreviewType;
  dropDownMenu: ReactNode;
  border?: boolean;
}) => {
  const { firstName, lastName, email } = memberData;

  return (
    <li
      className={`flex items-center justify-between ${
        border
          ? 'py-1 border-b border-border-light dark:border-border-dark last:border-0'
          : ''
      }`}
    >
      <div className='flex gap-4 items-center py-2 font-medium text-text-light-1 whitespace-nowrap dark:text-text-dark-1'>
        <p className='w-10 h-10 bg-special-color rounded-2xl flex items-center justify-center text-white font-semibold'>
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
      {dropDownMenu}
    </li>
  );
};

export default MemberItem;
