import { RadioElementType } from './RadioGroup';

const RadioElement = ({ label, value, register }: RadioElementType) => {
  return (
    <li className='w-full'>
      <input
        id={value}
        className='hidden peer'
        type='radio'
        value={value}
        {...register}
      />
      <label
        htmlFor={value}
        className='bg-bg-light-3 md:hover:bg-bg-light-hover mt-1 shadow-sm px-4 py-1.5 lg:py-2 text-text-light-1 dark:text-text-dark-1 capitalize border border-border-light dark:border-border-dark rounded-lg flex justify-center items-center peer-checked:border-special-color active:bg-bg-light-hover dark:md:hover:bg-bg-dark-2 dark:active:bg-bg-dark-2 cursor-pointer'
      >
        {label}
      </label>
    </li>
  );
};

export default RadioElement;
