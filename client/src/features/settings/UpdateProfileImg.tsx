import {
  HiOutlinePencil,
  HiOutlinePhoto,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Button from '../../components/Button';
import defaultImg from '/user.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';

const UpdateProfileImg = () => {
  return (
    <header className='flex flex-col lg:flex-row items-center gap-5 lg:gap-12 p-6'>
      <DropdownMenu>
        <DropdownMenuTrigger className='relative'>
          <img src={defaultImg} className='rounded-3xl h-28 w-28' />
          <button className='absolute bottom-[-5px] right-[-5px] flex items-center gap-2 bg-bg-light-contrast text-text-dark-1 dark:bg-bg-dark-contrast p-1 rounded-lg border border-border-dark dark:border-border-light'>
            <HiOutlinePencil size={22} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mt-2'>
          <DropdownMenuItem icon={<HiOutlinePhoto />}>
            Upload image
          </DropdownMenuItem>
          <DropdownMenuItem icon={<HiOutlineTrash />} danger>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='hidden lg:flex lg:gap-3'>
        <Button>Upload image</Button>
        <Button styleType='outline'>Remove</Button>
      </div>
    </header>
  );
};

export default UpdateProfileImg;
