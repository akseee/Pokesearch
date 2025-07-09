import type { ApiResponse, NamedAPIResource } from '../types/api';

export async function fetchPokemonsAPI(
  query: string
): Promise<ApiResponse<NamedAPIResource>> {
  if (query) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
    );
    if (!response.ok) throw new Error('No Pokémon found');
    const data = await response.json();

    return {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ],
    };
  }
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  return await response.json();
}
