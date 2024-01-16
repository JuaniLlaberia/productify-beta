const UserListSelectItem = ({
  _id,
  firstName,
  lastName,
  email,
  profileImg,
  onChange,
  checked,
}: UserPreviewType & {
  onChange: (userId: string) => void;
  checked: boolean;
}) => {
  return (
    <li
      key={_id}
      className='flex justify-between items-center px-2'
    >
      <label
        htmlFor={_id}
        className='flex gap-3 items-center py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer'
      >
        <p className='w-8 h-8 bg-special-color rounded-full flex items-center justify-center text-white font-semibold'>
          J
        </p>
        <p className='flex flex-col justify-center items-start gap-0.5'>
          <span className='text-sm lg:text-base'>
            {firstName && lastName ? `${firstName} ${lastName}` : email}
          </span>
          <span className='text-xs text-text-light-2 opacity-80'>{email}</span>
        </p>
      </label>
      <input
        onChange={() => onChange(_id)}
        id={_id}
        type='checkbox'
        className='cursor-pointer w-4 h-4 accent-special-color'
        checked={checked}
      />
    </li>
  );
};

export default UserListSelectItem;
