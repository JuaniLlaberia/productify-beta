import { UseFormRegister } from 'react-hook-form';
import { Themes } from '../../context/ThemeContext';

type ThemeItemType = {
  register: UseFormRegister<any>;
  toggleTheme: (type: Themes) => void;
  themeImg: string;
  value: string;
  label: string;
  themeType: Themes;
};

const ThemeItem = ({
  register,
  toggleTheme,
  themeImg,
  value,
  label,
  themeType,
}: ThemeItemType) => {
  return (
    <li
      className={`min-w-[200px] max-w-[275px] rounded-lg overflow-hidden shadow-sm border ${
        value === themeType
          ? 'border-4 border-special-color'
          : 'border-light dark:border-dark'
      }`}
    >
      <input
        {...register('theme')}
        value={value}
        id={value}
        className='hidden peer'
        type='radio'
        onChange={val => toggleTheme(val.target.value)}
      />
      <label
        htmlFor={value}
        className='cursor-pointer peer-checked:cursor-not-allowed'
      >
        <img src={themeImg} />
        <p className='py-3 font-semibold text-text-dark-1 bg-bg-light-contrast w-full text-center'>
          {label}
        </p>
      </label>
    </li>
  );
};

export default ThemeItem;
