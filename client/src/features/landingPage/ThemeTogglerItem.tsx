import { ReactElement } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Themes, useThemeContext } from '../../context/ThemeContext';

const ThemeTogglerItem = ({
  value,
  icon,
  register,
}: {
  value: Themes;
  icon: ReactElement;
  register: UseFormRegister<{ theme: Themes }>;
}) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <li className='flex'>
      <label
        htmlFor={value}
        className={`${
          theme.themeType === value
            ? 'bg-bg-light-hover-2 text-text-light-1 dark:bg-bg-dark-3 dark:text-text-dark-1'
            : ''
        } p-1 rounded-full`}
      >
        {icon}
      </label>
      <input
        {...register('theme')}
        id={value}
        type='radio'
        hidden
        value={value}
        onChange={val => toggleTheme(val.target.value as Themes)}
      />
    </li>
  );
};

export default ThemeTogglerItem;
