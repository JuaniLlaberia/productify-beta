import { useForm } from 'react-hook-form';

import themeDarkImg from '/theme_dark.png';
import themeLightImg from '/theme_light.png';
import themeSystemImg from '/theme_system.png';
import ThemeItem from './ThemeItem';
import { Themes, useThemeContext } from '../../context/ThemeContext';

const AppearanceWindow = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { register } = useForm<{ theme: Themes }>({
    defaultValues: { theme: theme.themeType },
  });

  return (
    <section className='px-3'>
      <h2 className='my-1 text-2xl text-text-light-1 dark:text-text-dark-1 font-semibold'>
        Change Theme
      </h2>
      <p className='text-sm lg:text-base text-text-light-2 dark:text-text-dark-2 mb-7'>
        Select your prefered UI theme for X. You can select the{' '}
        <span className='font-semibold'>Light Mode</span>,{' '}
        <span className='font-semibold'>Dark Mode</span> or use your{' '}
        <span className='font-semibold'>OS Default</span>.
      </p>

      <ul className='flex justify-center flex-wrap gap-8 px-3 py-5'>
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
    </section>
  );
};

export default AppearanceWindow;
