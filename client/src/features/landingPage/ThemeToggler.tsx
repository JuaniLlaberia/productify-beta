import { HiComputerDesktop, HiMoon, HiSun } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

import ThemeTogglerItem from './ThemeTogglerItem';
import { Themes, useThemeContext } from '../../context/ThemeContext';

const ThemeToggler = () => {
  const { theme } = useThemeContext();

  const { register } = useForm<{ theme: Themes }>({
    defaultValues: { theme: theme.themeType },
  });

  return (
    <ul className='flex gap-3'>
      <ThemeTogglerItem
        value='light'
        icon={<HiSun />}
        register={register}
      />
      <ThemeTogglerItem
        value='dark'
        icon={<HiMoon />}
        register={register}
      />
      <ThemeTogglerItem
        value='system'
        icon={<HiComputerDesktop />}
        register={register}
      />
    </ul>
  );
};

export default ThemeToggler;
