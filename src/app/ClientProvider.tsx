'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { LanguageContext } from '../shared/config/context/LanguageContext';
import { ThemeContext } from '../shared/config/context/ThemeContext';
import { Header } from '../widgets/Header';
import { Flyout } from '../widgets/Flyout/ui/Flyout';
import store from '../shared/config/store/store';

function ClientProvider({ children }: { children: ReactNode }) {
  const prefersDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;

  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Provider store={store}>
          <Header />
          {children}
          <Flyout />
        </Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default ClientProvider;
