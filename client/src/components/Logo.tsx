import { ComponentProps } from 'react';

import logoLight from '/logo_text_light.png';
import logoDark from '/logo_text_dark.png';
import { cn } from '../utils/shadcnUtils';
import { useThemeContext } from '../context/ThemeContext';

const Logo = ({ className, ...props }: ComponentProps<'img'>) => {
  const { theme } = useThemeContext();

  return (
    <img
      {...props}
      src={theme.theme === 'dark' ? logoDark : logoLight}
      className={cn('aspect-auto w-28 lg:w-32 cursor-pointer', className)}
      alt='logo'
    />
  );
};

export default Logo;
