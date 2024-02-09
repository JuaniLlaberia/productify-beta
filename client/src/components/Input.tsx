import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ComponentProps, ReactElement } from 'react';

type InputPropsType = {
  icon?: ReactElement;
  register?: UseFormRegisterReturn;
} & ComponentProps<'input'>;

const Input = ({ icon, register, ...props }: InputPropsType) => {
  return (
    <div className='relative'>
      <input
        {...register}
        {...props}
        className={`w-full p-2 py-2 h-10 lg:py-2.5 ${
          icon ? 'pl-10' : 'lg:px-3'
        } my-1 border border-border-light dark:border-border-dark bg-bg-light-3 dark:bg-bg-dark-2 text-text-light-1 dark:text-text-dark-1 md:hover:bg-bg-light-hover rounded-lg placeholder:text-text-light-2 placeholder:pb-3 dark:placeholder:text-text-dark-2 transition-all`}
      />
      {icon ? (
        <span className='absolute text-text-light-2 dark:text-text-dark-2 text-xl lg:text-2xl left-3 bottom-[50%] translate-y-[50%]'>
          {icon}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
