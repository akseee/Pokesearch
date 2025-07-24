import { server } from '../config/msw/server';
import { fetchPokemonsAPI } from './fetchPokemonsAPI';

describe('Fetch Pokemons API', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('returns list of 3 pokemons if no query is given ', async () => {
    const res = await fetchPokemonsAPI();

    expect(res.count).toBe(3);
    expect(res.results).toHaveLength(3);
    expect(res.results[0].name).toBe('pokemon1');
  });

  test('returns pokemon data when query is given ', async () => {
    const res = await fetchPokemonsAPI('1');

    expect(res.count).toBe(1);
    expect(res.results).toHaveLength(1);
    expect(res.results[0].name).toBe('pikachu');
    expect(res.results[0].url).toBe(
      'https://pokeapi.co/api/v2/pokemon/pikachu/'
    );
  });

  test('returns error when no query is found', async () => {
    expect(fetchPokemonsAPI('notfound')).rejects.toThrow('No Pokémon found');
  });
});
