import { createGoogleAuthUrl } from '../utils/createGoogleAuthUrl';

const LandingPage = () => {
  return <a href={createGoogleAuthUrl()}>LandingPage</a>;
};

export default LandingPage;
