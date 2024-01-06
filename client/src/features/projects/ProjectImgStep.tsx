import { HiOutlineUserGroup } from 'react-icons/hi2';
import { StepType } from '../../types/extraTypes';

const ProjectImgStep = ({ nameError, register }: StepType) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center bg-[#eeeded] text-[#a0a0a073] border border-[#a0a0a02d] w-20 h-20 rounded-md lg:w-24 lg:h-24'>
          <HiOutlineUserGroup size={50} />
        </div>
        <p className='text-sm text-text-light-2 font-semibold mt-1 lg:text-base'>
          Choose Image
        </p>
      </div>
    </>
  );
};

export default ProjectImgStep;
