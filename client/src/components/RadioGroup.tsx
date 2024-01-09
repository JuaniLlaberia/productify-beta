import { UseFormRegisterReturn } from 'react-hook-form';
import RadioElement from './RadioElement';

export type RadioElementType = {
  label: string;
  value: string;
  register?: UseFormRegisterReturn;
};

type RadioGroupType = {
  label: string;
  errorMsg?: string;
  register?: UseFormRegisterReturn;
  options: RadioElementType[];
};

const RadioGroup = ({ label, errorMsg, register, options }: RadioGroupType) => {
  return (
    <div className='mb-5'>
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
      <ul className='flex gap-2'>
        {options.map(option => (
          <RadioElement
            key={option.value}
            label={option.label}
            value={option.value}
            register={register}
          />
        ))}
      </ul>
      {errorMsg ? <p className='px-0.5 text-red-400'>{errorMsg}</p> : null}
    </div>
  );
};

export default RadioGroup;
