import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../../shared/config/msw/server';
import { usePokemonData } from './usePokemonData';
import { mockPokemonSource } from '../../../shared/lib/mocks';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('usePokemonData', () => {
  test('loads pokemon data and description correctly if give a name', async () => {
    const { result } = renderHook(() => usePokemonData('pikachu'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.pokemonData?.description).toBeDefined();
    });

    expect(result.current.pokemonData?.name).toBe('pikachu');
  });

  test('loads pokemon data and description correctly if give object', async () => {
    const { result } = renderHook(() => usePokemonData(mockPokemonSource));

    await waitFor(() => {
      expect(result.current.pokemonData?.description).toBeDefined();
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonData?.name).toBe('pikachu');
  });
});
