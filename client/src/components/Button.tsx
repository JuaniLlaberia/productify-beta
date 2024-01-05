import type { ComponentProps } from 'react';

type ButtonPropsType = {
  full?: boolean;
  rounded?: boolean;
  styleType?: 'outline' | 'special' | 'danger';
} & ComponentProps<'button'>;

const Button = ({ full, rounded, styleType, ...props }: ButtonPropsType) => {
  return (
    <button
      {...props}
      className={`
       font-semibold px-4 py-1.5  active:opacity-85 md:hover:opacity-85 transition-colors ${
         full ? 'w-full' : ''
       } ${rounded ? 'rounded-full' : 'rounded-md'} ${
        styleType === 'outline'
          ? 'bg-white border border-bg-light-contrast text-text-light-1 dark:text-text-dark-1 dark:border-bg-dark-contrast'
          : styleType === 'special'
          ? 'bg-special-color'
          : styleType === 'danger'
          ? 'bg-red-400 border text-text-dark-1'
          : 'bg-bg-light-contrast text-text-dark-1 dark:bg-bg-dark-contrast dark:text-text-light-1'
      } `}
    ></button>
  );
};

export default Button;
