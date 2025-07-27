import type { ApiResponse, NamedAPIResource } from '../types/api.types';

export async function fetchPokemonsAPI(
  query?: string,
  page?: number
): Promise<ApiResponse<NamedAPIResource>> {
  if (query) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
    );
    if (!response.ok) throw new Error('No Pokémon found');
    const data = await response.json();

    return {
      count: 1,
      results: [
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.name}/`,
        },
      ],
    };
  }

  const offset = page && page > 1 ? (page - 1) * 20 : 0;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error('Failed to fetch Pokémon list');
  return await response.json();
}
