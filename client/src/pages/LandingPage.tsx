import LandingNavbar from '../features/landingPage/LandingNavbar';
import LandingHeader from '../features/landingPage/LandingHeader';
import LandingCards from '../features/landingPage/LandingCards';
import LandingFooter from '../features/landingPage/LandingFooter';

const LandingPage = () => {
  return (
    <main className='h-full min-h-[100dvh] w-full bg-bg-light-2 dark:bg-bg-dark-1'>
      <LandingNavbar />
      <LandingHeader />
      <LandingCards />
      <LandingFooter />
    </main>
  );
};

export default LandingPage;
