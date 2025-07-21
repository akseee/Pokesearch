import type { ApiResponse, NamedAPIResource } from '../types/api';

export const BASE_API = 'https://pokeapi.co/api/v2/pokemon/';

export const initialStateApiResponse: ApiResponse<NamedAPIResource> = {
  count: 1,
  results: [],
};

export const URL_PARAMS = {};
