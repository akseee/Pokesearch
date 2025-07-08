import type { NamedAPIResource } from '../../../shared/types/api';
import { fetchOnePokemonData } from './fetchOnePokemonData';
import type { PokemonData } from './types';

export async function fetchAllPokemonsData(
  resources: NamedAPIResource[]
): Promise<PokemonData[]> {
  const fetches = resources.map(fetchOnePokemonData);
  const all = await Promise.allSettled(fetches);

  return all
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
}
