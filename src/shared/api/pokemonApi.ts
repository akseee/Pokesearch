import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, NamedAPIResource } from './api.types';
import { BASE_API, POKEMON_URL } from '../lib/constants';
import type { RawPokemonResponse } from '../../entities/pokemon/model/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ['PokemonList', 'Pokemon'],
  endpoints: (builder) => ({
    getPokemons: builder.query<
      ApiResponse<NamedAPIResource>,
      { query?: string; page?: number }
    >({
      query: ({ query, page = 1 }) => {
        if (query) return `/${query.toLowerCase()}`;
        const offset = (page - 1) * 20;
        return `/pokemon?limit=20&offset=${offset}`;
      },
      transformResponse: (
        response: RawPokemonResponse
      ): ApiResponse<NamedAPIResource> => {
        if ('name' in response) {
          const data = response;
          return {
            count: 1,
            results: [
              {
                name: data.name,
                url: `${BASE_API}${POKEMON_URL}${data.name}`,
              },
            ],
          };
        }
        return response;
      },
      providesTags: (result, error, arg) => [
        { type: 'PokemonList', id: arg.page },
      ],
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
