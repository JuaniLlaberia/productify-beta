import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

import { createGithubAuthUrl } from '../../utils/createGithubAuthUrl';

const GithubBtn = () => {
  return (
    <Link
      to={createGithubAuthUrl()}
      className='bg-bg-dark-1 md:hover:bg-bg-dark-2 text-text-dark-1 flex justify-center items-center gap-2 active:bg-light-bg-3 md:hover:bg-light-bg-3 shadow-sm border border-border-light rounded-sm py-3 px-6 lg:py-5 my-3 font-semibold cursor-pointer transition-all md:hover:opacity-90'
    >
      <FaGithub size={25} />
      <span className='lg:text-xl'>Continue with Github</span>
    </Link>
  );
};

export default GithubBtn;
