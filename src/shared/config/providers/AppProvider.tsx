'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvder } from './ThemeProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvder>{children}</ThemeProvder>
    </Provider>
  );
}
