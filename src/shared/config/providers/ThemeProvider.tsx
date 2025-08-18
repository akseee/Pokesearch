import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const ThemeProvder = ({ children }: { children: ReactNode }) => {
  const prefersDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;

  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
