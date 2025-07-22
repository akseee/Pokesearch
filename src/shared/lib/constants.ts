import type { ApiResponse, NamedAPIResource } from '../types/api';

export const BASE_API = 'https://pokeapi.co/api/v2/pokemon/';
export const SPECIES_API = 'https://pokeapi.co/api/v2/pokemon-species/';

export const initialStateApiResponse: ApiResponse<NamedAPIResource> = {
  count: 1,
  results: [],
};

export const STORAGE_KEYS = {
  POKEMON_QUERY: 'pokemon-query',
} as const;
