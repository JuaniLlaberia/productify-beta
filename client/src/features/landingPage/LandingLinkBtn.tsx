import { Link } from 'react-router-dom';

const LandingLinkBtn = ({
  to,
  text,
  small,
  altColor,
}: {
  to: string;
  text: string;
  small?: boolean;
  altColor?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`flex ${
        !altColor
          ? 'bg-bg-dark-2 md:hover:bg-bg-dark-3'
          : 'bg-transparent border-none hover:underline text-text-light-2 dark:text-text-dark-2 hover:text-text-light-1 dark:hover:text-text-dark-1'
      }  border border-border-dark ${
        small
          ? 'text-xs lg:text-sm px-3 py-1'
          : 'text-sm lg:text-base px-4 py-1.5 lg:px-5 lg:py-2'
      } rounded-lg text-text-dark-2 font-semibold transition-colors`}
    >
      {text}
    </Link>
  );
};

export default LandingLinkBtn;
