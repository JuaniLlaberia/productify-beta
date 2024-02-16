import { ClipLoader } from 'react-spinners';
import type { ComponentProps } from 'react';
import { cn } from '../utils/shadcnUtils';

type ButtonPropsType = {
  full?: boolean;
  rounded?: boolean;
  styleType?: 'outline' | 'special' | 'danger';
  isLoading?: boolean;
} & ComponentProps<'button'>;

const Button = ({
  className,
  full,
  rounded,
  styleType,
  isLoading,
  ...props
}: ButtonPropsType) => {
  return (
    <button
      disabled={isLoading}
      {...props}
      className={cn(
        `
       font-semibold px-4 py-1.5 active:opacity-90 md:hover:opacity-90 transition-colors disabled:cursor-not-allowed ${
         full ? 'w-full' : ''
       } ${rounded ? 'rounded-full' : 'rounded-lg'} ${
          styleType === 'outline'
            ? 'bg-transparent text-text-light-1 dark:text-text-dark-1 hover:bg-bg-light-hover-2'
            : styleType === 'special'
            ? 'bg-special-color'
            : styleType === 'danger'
            ? 'bg-red-400 dark:bg-red-500 text-text-dark-1'
            : 'bg-bg-light-contrast text-text-dark-1 dark:bg-bg-light-3 dark:text-text-light-1'
        } min-w-28 lg:py-2 lg:px-5`,
        className
      )}
    >
      {isLoading ? (
        <span className='flex items-center justify-center py-0.5'>
          <ClipLoader
            size={'20px'}
            color='gray'
          />
        </span>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
