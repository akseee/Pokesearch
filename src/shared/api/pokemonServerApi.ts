import { BASE_API, POKEMON_URL } from '../lib/constants';
import { PokemonData, PokemonStats } from '../types/pokemon.types';
import {
  ApiResponse,
  NamedAPIResource,
  RawPokemonResponse,
  RawPokemonSpeciesResponse,
} from './api.types';

export async function fetchOnePokemon(source: string): Promise<PokemonData> {
  const url = source.startsWith('http')
    ? source
    : `${POKEMON_URL}${source.toLowerCase()}`;

  const response = await fetch(url);
  const data: RawPokemonResponse = await response.json();

  const speciesResponse = await fetch(data.species.url);
  const speciesData: RawPokemonSpeciesResponse = await speciesResponse.json();

  const entry = speciesData.flavor_text_entries.find(
    (item) => item.language.name === 'en'
  );

  const stats: PokemonStats = {};
  data.stats.forEach((s) => {
    const key = s.stat.name as keyof PokemonStats;
    stats[key] = s.base_stat;
  });

  const image =
    data.sprites.other?.['official-artwork']?.front_default ||
    data.sprites.other?.dream_world?.front_default ||
    undefined;

  return {
    id: data.id,
    name: data.name,
    type: data.types[0]?.type.name || 'unknown',
    image,
    order: data.order,
    description: entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : null,
    stats,
  };
}

export async function fetchManyPokemons({
  query,
  page = 1,
}: {
  query?: string;
  page?: number;
}): Promise<ApiResponse<PokemonData>> {
  if (query) {
    const one = await fetchOnePokemon(query);
    return { count: 1, results: [one] };
  }
  const offset = (page - 1) * 20;
  const response = await fetch(`${BASE_API}/pokemon?limit=20&offset=${offset}`);
  const data: ApiResponse<NamedAPIResource> = await response.json();

  const cards: PokemonData[] = await Promise.all(
    data.results.map((item) => {
      return fetchOnePokemon(item.url);
    })
  );

  return { count: data.count, results: cards };
}
