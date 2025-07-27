import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../../shared/config/msw/server';
import { usePokemonsListData } from './usePokemonListData';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UsePokemonListData', () => {
  describe('should return data from url params ', () => {
    test('with no page given', async () => {
      const { result } = renderHook(() => usePokemonsListData('', 1));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeNull();
      expect(result.current.pokemonsData).toBeDefined();
      expect(result.current.pokemonsData?.results.length).toBeGreaterThan(0);
      expect(result.current.pokemonsData?.results[0].name).toBe('pokemon1');
    });

    test('with page given', async () => {
      const { result } = renderHook(() => usePokemonsListData('', 2));
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeNull();
      expect(result.current.pokemonsData).toBeDefined();
      expect(result.current.pokemonsData?.results.length).toBeGreaterThan(0);
      expect(result.current.pokemonsData?.results[0].name).toBe('pokemon4');
    });
  });
});
