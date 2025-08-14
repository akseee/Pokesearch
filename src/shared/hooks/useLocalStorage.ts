import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (STORAGE_KEY: string, initialValue = '') => {
  const [queryLS, setQueryLSState] = useState(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedQuery = localStorage.getItem(STORAGE_KEY);
    if (storedQuery) {
      setQueryLSState(storedQuery);
    }
  }, [STORAGE_KEY]);

  const setQueryLS = useCallback(
    (value: string) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, value);
      setQueryLSState(value);
    },
    [STORAGE_KEY]
  );

  return { queryLS, setQueryLS };
};
