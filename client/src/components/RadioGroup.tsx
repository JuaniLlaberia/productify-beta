import { UseFormRegisterReturn } from 'react-hook-form';
import RadioElement from './RadioElement';

export type RadioElementType = {
  label: string;
  value: string;
  register?: UseFormRegisterReturn;
};

type RadioGroupType = {
  register?: UseFormRegisterReturn;
  options: RadioElementType[];
};

const RadioGroup = ({ register, options }: RadioGroupType) => {
  return (
    <div className='mb-5'>
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
    </div>
  );
};

export default RadioGroup;
