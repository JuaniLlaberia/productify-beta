import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ComponentProps, ReactElement } from 'react';

type InputPropsType = {
  label?: string;
  errorMsg?: string;
  icon?: ReactElement;
  register?: UseFormRegisterReturn;
} & ComponentProps<'textarea'>;

const Textarea = ({
  label,
  errorMsg,
  icon,
  register,
  ...props
}: InputPropsType) => {
  return (
    <div className='mb-5 mt-2'>
      {label ? (
        <label
          htmlFor={label}
          className={`px-0.5 ${
            errorMsg
              ? 'text-red-400'
              : 'text-text-light-1 dark:text-text-dark-1'
          }`}
        >
          {label}
        </label>
      ) : null}
      <div className='relative'>
        <textarea
          {...register}
          {...props}
          id={label}
          className={`w-full p-2 py-2 lg:py-2.5 ${
            icon ? 'pl-10' : 'lg:px-3'
          } my-1 border bg-bg-light-3 md:hover:bg-bg-light-hover ${
            errorMsg
              ? 'border-red-400 outline-red-400'
              : 'border-border-light outline-bg-light-contrast dark:border-bg-dark-contrast dark:outline-bg-dark-contrast'
          } rounded-lg transition-colors min-h-[150px] max-h-[250px]`}
        />
        {icon ? (
          <span className='absolute text-text-light-2 dark:text-text-dark-2 text-xl lg:text-2xl left-3 bottom-[50%] translate-y-[50%]'>
            {icon}
          </span>
        ) : null}
      </div>
      {errorMsg ? <p className='px-0.5 text-red-400'>{errorMsg}</p> : null}
    </div>
  );
};

export default Textarea;
