export function queryLocalStorage() {
  const name = 'pokemon-query';
  return {
    getQuery: () => {
      return localStorage.getItem(name) || '';
    },
    setQuery: (value: string) => {
      localStorage.setItem(name, value);
    },
  };
}
