import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { createGoogleAuthUrl } from '../../utils/createGoogleAuthUrl';

const GoogleBtn = () => {
  return (
    <Link
      to={createGoogleAuthUrl()}
      className='bg-[#ffffff] md:hover:opacity-80 text-text-light-1 flex justify-center items-center gap-2 active:bg-light-bg-3 md:hover:bg-light-bg-3 shadow-sm border border-border-light rounded-sm py-2 lg:py-3 px-6 my-3 font-semibold cursor-pointer transition-all'
    >
      <FcGoogle size={25} />
      <span className='lg:text-lg'>Continue with Google</span>
    </Link>
  );
};

export default GoogleBtn;
