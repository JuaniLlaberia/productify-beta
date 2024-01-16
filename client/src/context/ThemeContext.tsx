import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
const root = document.getElementById('html')!;

export type Themes = 'light' | 'dark' | 'system';

type ThemeType = {
  theme: 'light' | 'dark';
  themeType: Themes;
};

type ThemeContextType = {
  theme: ThemeType;
  handleToggleTheme: (type: Themes) => void;
};

//Function to determine the theme and theme type based on value passed
const getTheme = (storedTheme: string): ThemeType => {
  if (!storedTheme || storedTheme === 'light')
    return { theme: 'light', themeType: 'light' };

  if (storedTheme === 'dark') {
    return { theme: 'dark', themeType: 'dark' };
  } else {
    return {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      themeType: 'system',
    };
  }
};

const themeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<ThemeType>(() =>
    getTheme(localStorage.getItem('THEME_STYLE')!)
  );

  const handleToggleTheme = (type: Themes) => {
    const theme = getTheme(type);
    setTheme(theme);

    localStorage.setItem('THEME_STYLE', theme.themeType);
  };

  useEffect(() => {
    root.className = theme.theme;
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, handleToggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(themeContext);
  if (!context) throw new Error('Must be using inside the provider');

  return {
    theme: context.theme,
    toggleTheme: context.handleToggleTheme,
  };
};

export default ThemeProvider;
