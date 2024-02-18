import { ReactElement } from 'react';

export type CardType = {
  title: string;
  description: string;
  icon: ReactElement;
};

const LandingCard = ({ icon, title, description }: CardType) => {
  return (
    <li
      className={`flex flex-col py-6 px-8 bg-gradient-to-t from-bg-dark-3 to-bg-dark-2 rounded-lg border border-border-light dark:border-bg-light-hover-2 hover:border-bg-light-hover-2 dark:hover:border-border-dark transition-colors`}
    >
      <span className='text-3xl text-special-color mb-3'>{icon}</span>
      <div className='flex-1 flex flex-col mb-10'>
        <h2 className='font-semibold text-2xl text-text-light-1 dark:text-text-dark-1 w-full'>
          {title}
        </h2>
        <p className={`font-thin text-text-light-2 dark:text-text-dark-2 mt-5`}>
          {description}
        </p>
      </div>
    </li>
  );
};

export default LandingCard;
