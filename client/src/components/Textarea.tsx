import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ComponentProps, ReactElement } from 'react';

type InputPropsType = {
  icon?: ReactElement;
  register?: UseFormRegisterReturn;
} & ComponentProps<'textarea'>;

const Textarea = ({ icon, register, ...props }: InputPropsType) => {
  return (
    <div className='relative'>
      <textarea
        {...register}
        {...props}
        className={`w-full p-2 py-2 lg:py-2.5 ${
          icon ? 'pl-10' : 'lg:px-3'
        } my-1 border bg-bg-light-3 md:hover:bg-bg-light-hover  rounded-lg transition-colors min-h-[150px] max-h-[250px]`}
      />
      {icon ? (
        <span className='absolute text-text-light-2 dark:text-text-dark-2 text-xl lg:text-2xl left-3 bottom-[50%] translate-y-[50%]'>
          {icon}
        </span>
      ) : null}
    </div>
  );
};

export default Textarea;
