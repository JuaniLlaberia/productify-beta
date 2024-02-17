import Logo from '../../components/Logo';
import LandingLinkBtn from './LandingLinkBtn';

const LandingNavbar = () => {
  return (
    <nav className='flex items-center justify-between border-b border-border-light dark:border-border-dark py-2 px-5 lg:px-48'>
      <Logo />
      <div className='lg:flex lg:gap-3'>
        <div className='hidden lg:block'>
          <LandingLinkBtn
            altColor
            to='/auth'
            text='Start your project'
            small
          />
        </div>
        <LandingLinkBtn
          to='/auth'
          text='Sign in'
          small
        />
      </div>
    </nav>
  );
};

export default LandingNavbar;
