import { ClipLoader } from 'react-spinners';
import type { ComponentProps } from 'react';

type ButtonPropsType = {
  full?: boolean;
  rounded?: boolean;
  styleType?: 'outline' | 'special' | 'danger';
  isLoading?: boolean;
} & ComponentProps<'button'>;

const Button = ({
  full,
  rounded,
  styleType,
  isLoading,
  ...props
}: ButtonPropsType) => {
  return (
    <button
      {...props}
      className={`
       font-semibold px-4 py-1.5 active:opacity-90 md:hover:opacity-90 transition-colors ${
         full ? 'w-full' : ''
       } ${rounded ? 'rounded-full' : 'rounded-sm'} ${
        styleType === 'outline'
          ? 'bg-white border border-bg-light-contrast text-text-light-1 dark:text-text-dark-1 dark:border-bg-dark-contrast'
          : styleType === 'special'
          ? 'bg-special-color'
          : styleType === 'danger'
          ? 'bg-red-400 border text-text-dark-1'
          : 'bg-bg-light-contrast text-text-dark-1 dark:bg-bg-dark-contrast dark:text-text-light-1'
      } lg:py-2 lg:text-lg`}
    >
      {isLoading ? (
        <span className='flex items-center justify-center py-0.5'>
          <ClipLoader
            size={'20px'}
            color='white'
          />
        </span>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
