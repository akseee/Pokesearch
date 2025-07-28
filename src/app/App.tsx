import { useEffect, useState, type JSX } from 'react';
import '../shared/styles';
import { Router } from './router/Router';
import { ThemeContext } from '../shared/config/context/context';

export const App = (): JSX.Element => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router />
    </ThemeContext.Provider>
  );
};

export default App;
