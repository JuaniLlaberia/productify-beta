import type { FieldValues, UseFormRegister } from 'react-hook-form';
import type { ComponentProps, ReactElement } from 'react';

type InputPropsType = {
  label?: string;
  errorMsg?: string;
  icon?: ReactElement;
  register?: UseFormRegister<FieldValues>;
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
          }`}
        >
          {label}
        </label>
      ) : null}
      <div className='relative'>
        <input
          {...register}
          {...props}
          className={`w-full p-2 ${
            icon ? 'pl-9' : ''
          } my-1 border bg-bg-white ${
            errorMsg
              ? 'border-red-400 outline-red-400'
              : 'border-bg-light-contrast outline-bg-light-contrast dark:border-bg-dark-contrast dark:outline-bg-dark-contrast'
          }  rounded-sm  transition-all`}
        />
        {icon ? (
          <span className='absolute text-text-light-2 text-xl left-2 bottom-[50%] translate-y-[50%]'>
            {icon}
          </span>
        ) : null}
      </div>
      {errorMsg ? <p className='px-0.5 text-red-400'>{errorMsg}</p> : null}
    </div>
  );
};

export default Input;
