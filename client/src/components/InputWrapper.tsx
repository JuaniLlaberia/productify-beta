import type { ComponentProps, ReactNode } from 'react';

type InputPropsType = {
  label?: string;
  errorMsg?: string;
  children: ReactNode;
} & ComponentProps<'label'>;

const InputWrapper = ({
  label,
  errorMsg,
  children,
  ...props
}: InputPropsType) => {
  return (
    <div className='mb-1 mt-2'>
      {label ? (
        <label
          {...props}
          className='px-0.5 text-sm text-text-light-1 dark:text-text-dark-1 2xl:text-base'
        >
          {label}
        </label>
      ) : null}
      {children}
      {errorMsg ? (
        <p className='px-0.5 text-sm 2xl:text-base text-red-400 dark:text-red-500'>
          {errorMsg}
        </p>
      ) : null}
    </div>
  );
};

export default InputWrapper;
