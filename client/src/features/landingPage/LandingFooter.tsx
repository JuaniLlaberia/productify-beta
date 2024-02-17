import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

import Logo from '../../components/Logo';
import ThemeToggler from './ThemeToggler';
import LandingLinkBtn from './LandingLinkBtn';
import { HiOutlineSparkles } from 'react-icons/hi2';

const LandingFooter = () => {
  return (
    <>
      <section className='flex flex-col justify-center items-center gap-4 lg:gap-6 py-16 lg:py-32 border- border-border-light dark:border-border-dark'>
        <h3 className='lg:flex lg:gap-2 text-text-light-2 text-center dark:text-text-dark-2 text-2xl lg:text-3xl'>
          <span className='flex items-center gap-2'>
            <HiOutlineSparkles /> Organize your work &
          </span>
          <span className='bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent'>
            {' '}
            be more efficient
          </span>
        </h3>
        <LandingLinkBtn
          to='/auth'
          text='Start your project'
        />
      </section>
      <footer className='bg-bg-contrast border-t border-border-light dark:border-border-dark dark:bg-bg-dark-2 p-6 lg:px-48'>
        <Logo />
        <div className='flex items-center justify-between text-text-light-2 dark:text-text-dark-2 my-2 mb-10 text-2xl'>
          <ul className='flex gap-4'>
            <li>
              <Link
                to='https://github.com/JuaniLlaberia/productivity-app'
                target='_blank'
              >
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link
                to='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/'
                target='_blank'
              >
                <FaLinkedinIn />
              </Link>
            </li>
          </ul>
          <ThemeToggler />
        </div>
        <p className='text-text-light-2 dark:text-text-dark-2 text-sm border-t border-border-light dark:border-border-dark mt-3 pt-3'>
          © Producify
        </p>
      </footer>
    </>
  );
};

export default LandingFooter;
