import { HiOutlinePhoto } from 'react-icons/hi2';

import Button from '../../components/Button';
import defaultImg from '/user.jpg';

const UpdateProfileImg = () => {
  return (
    <header className='flex items-center gap-12 p-6'>
      <div className='relative'>
        <img
          src={defaultImg}
          className='rounded-full'
        />
        <button className='absolute right-0 bottom-0 p-1 rounded-full bg-bg-light-contrast text-text-dark-2 border-2 border-bg-light-2 shadow-sm'>
          <HiOutlinePhoto size={25} />
        </button>
      </div>
      <div className='flex gap-3'>
        <Button>Upload image</Button>
        <Button styleType='outline'>Remove</Button>
      </div>
    </header>
  );
};

export default UpdateProfileImg;
