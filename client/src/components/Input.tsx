import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ComponentProps, ReactElement } from 'react';

type InputPropsType = {
  label?: string;
  errorMsg?: string;
  icon?: ReactElement;
  register?: UseFormRegisterReturn;
} & ComponentProps<'input'>;

const Input = ({
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
          className={`px-0.5 ${
            errorMsg
              ? 'text-red-400'
              : 'text-text-light-1 dark:text-text-dark-1'
          } lg:text-lg`}
        >
          {label}
        </label>
      ) : null}
      <div className='relative'>
        <input
          {...register}
          {...props}
          className={`w-full p-2 py-3.5 ${
            icon ? 'pl-9' : ''
          } my-1 border bg-bg-white ${
            errorMsg
              ? 'border-red-400 outline-red-400'
              : 'border-border-light outline-bg-light-contrast dark:border-bg-dark-contrast dark:outline-bg-dark-contrast'
          } rounded-sm  transition-all lg:py-4.5 lg:text-lg lg:pl-10`}
        />
        {icon ? (
          <span className='absolute text-text-light-2 text-xl lg:text-2xl left-2 bottom-[50%] translate-y-[50%]'>
            {icon}
          </span>
        ) : null}
      </div>
      {errorMsg ? <p className='px-0.5 text-red-400'>{errorMsg}</p> : null}
    </div>
  );
};

export default Input;
