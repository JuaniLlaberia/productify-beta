import {
  HiOutlinePencil,
  HiOutlinePhoto,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Skeleton from '../../components/skeletons/Skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';
import { useUpdateUserImg } from '../user/useUpdateUserImg';
import { useUserContext } from '../../context/UserContext';

const UpdateProfileImg = () => {
  const { updateUserImg, isLoading } = useUpdateUserImg();
  const { user } = useUserContext();

  const handleNewImage = (image: File | undefined) => {
    if (!image) {
      //Calling the endpoint without an image will remove the current image and set the default image
      updateUserImg(undefined);
    } else {
      const formData = new FormData();
      formData.append('profileImg', image);

      updateUserImg(formData);
    }
  };

  return (
    <header className='flex justify-between mt-4 mx-6 bg-bg-light-1 dark:bg-bg-dark-2 shadow-sm border border-border-light dark:border-border-dark rounded-lg lg:flex-row items-center gap-5 lg:gap-12 p-6'>
      <div>
        <h2 className='text-text-light-1 dark:text-text-dark-1 text-xl font-semibold mb-3'>
          Profile image
        </h2>
        <p className='text-text-light-2 dark:text-text-dark-2 text-sm'>
          Upload your own image or use one of the default ones.
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className='relative'
          asChild
        >
          {isLoading ? (
            <Skeleton className='h-28 w-28 rounded-3xl' />
          ) : (
            <div>
              <img
                src={user?.data?.profileImg}
                className='rounded-3xl h-20 min-w-20'
                alt='Profile photo'
              />

              <button
                aria-label='Open menu'
                className='absolute bottom-[-5px] right-[-5px] flex items-center gap-2 bg-bg-light-contrast text-text-dark-2 p-1 rounded-lg border border-border-dark'
              >
                <HiOutlinePencil size={22} />
              </button>
            </div>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mt-2'>
          <DropdownMenuItem icon={<HiOutlinePhoto />}>
            <label htmlFor='image-upload'>Upload image</label>
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={<HiOutlineTrash />}
            danger
            onClick={() => handleNewImage(undefined)}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        id='image-upload'
        className='hidden'
        type='file'
        onChange={e => handleNewImage(e.target.files?.[0])}
      />
    </header>
  );
};

export default UpdateProfileImg;
