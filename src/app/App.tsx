import { useEffect, useState, type JSX } from 'react';
import '../shared/styles';
import { Router } from './router/Router';
import { ThemeContext } from '../shared/config/context/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';
import { LanguageContext } from '../shared/config/context/LanguageContext';

export const App = (): JSX.Element => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
