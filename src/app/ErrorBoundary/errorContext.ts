import { createContext } from 'react';

interface ErrorContextType {
  error: Error | null;
  resetError: () => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  resetError: () => {},
});
