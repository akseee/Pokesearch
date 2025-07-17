import { queryLocalStorage } from './queryLocalStorage';

describe('Local storage', () => {
  const KEY = 'pokemon-query';

  beforeEach(() => {
    localStorage.clear();
  });
  describe('Functionality', () => {
    test('returns empty string if no value found', () => {
      const { getQuery } = queryLocalStorage();
      expect(getQuery()).toBe('');
    });

    test('saves and returns value', () => {
      const { getQuery, setQuery } = queryLocalStorage();

      setQuery('pikachu');

      expect(localStorage.getItem(KEY)).toBe('pikachu');
      expect(getQuery()).toBe('pikachu');
    });

    test('rewrites saves value', () => {
      const { getQuery, setQuery } = queryLocalStorage();

      setQuery('pikachu');
      setQuery('charizard');

      expect(getQuery()).toBe('charizard');
    });
  });
});
