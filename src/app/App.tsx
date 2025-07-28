import { useState, type JSX } from 'react';
import '../shared/styles';
import { ThemeContext } from './context/context';
import { Router } from './router/Router';

export const App = (): JSX.Element => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router />
    </ThemeContext.Provider>
  );
};

export default App;
