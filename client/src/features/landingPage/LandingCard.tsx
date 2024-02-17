import type { ReactElement } from 'react';

export type CardType = {
  icon: ReactElement;
  title: string;
  description: string;
  img: string;
};

const LandingCard = ({ icon, title, description, img }: CardType) => {
  return (
    <li className={`flex md:flex-row flex-col sm:py-16 py-6 px-8 bg-bg-dark-2`}>
      <div className={`flex-1 flex justify-center items-start flex-col`}>
        <h2
          className={`font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full`}
        >
          {title}
        </h2>
        <p
          className={`font-normal text-dimWhite text-text-dark-2 text-[18px] leading-[30.8px] max-w-[470px] mt-5`}
        >
          {description}
        </p>
      </div>

      <div
        className={`flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10 relative`}
      >
        <img
          src={img}
          alt='billing'
          className='w-[100%] h-[100%] border border-border-light dark:border-border-dark rounded-lg shadow-sm'
        />
      </div>
    </li>
  );
};

export default LandingCard;
// import type { ReactElement } from 'react';

// export type CardType = {
//   icon: ReactElement;
//   title: string;
//   description: string;
//   img: string;
// };

// const LandingCard = ({ icon, title, description, img }: CardType) => {
//   return (
//     <li className='bg-bg-light-1 dark:bg-bg-dark-2 rounded-lg p-5 shadow-sm border border-border-light dark:border-border-dark'>
//       <span className='text-special-color text-3xl mb-3'>{icon}</span>
//       <h2 className='text-text-light-1 dark:text-text-dark-1 font-semibold text-xl mb-1'>
//         {title}
//       </h2>
//       <p className='text-text-light-2 dark:text-text-dark-2'>{description}</p>
//       <img
//         src={img}
//         className='mt-8 object-center rounded-lg'
//       />
//     </li>
//   );
// };

// export default LandingCard;
