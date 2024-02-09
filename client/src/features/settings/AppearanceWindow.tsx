import { useForm } from 'react-hook-form';

import themeDarkImg from '/theme_dark.png';
import themeLightImg from '/theme_light.png';
import themeSystemImg from '/theme_system.png';
import ThemeItem from './ThemeItem';
import SettingsWindow from './SettingsWindow';
import { Themes, useThemeContext } from '../../context/ThemeContext';

const AppearanceWindow = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { register } = useForm<{ theme: Themes }>({
    defaultValues: { theme: theme.themeType },
  });

  return (
    <SettingsWindow title='Change Theme'>
      <ul className='flex justify-center flex-wrap gap-4 lg:gap-6 py-5'>
        <ThemeItem
          value='light'
          register={register}
          themeType={theme.themeType}
          themeImg={themeLightImg}
          toggleTheme={toggleTheme}
          label='Light Mode'
        />
        <ThemeItem
          value='dark'
          register={register}
          themeType={theme.themeType}
          themeImg={themeDarkImg}
          toggleTheme={toggleTheme}
          label='Dark Mode'
        />
        <ThemeItem
          value='system'
          register={register}
          themeType={theme.themeType}
          themeImg={themeSystemImg}
          toggleTheme={toggleTheme}
          label='System Default'
        />
      </ul>
    </SettingsWindow>
  );
};

export default AppearanceWindow;
