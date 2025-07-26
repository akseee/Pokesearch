import type { PokemonData } from '../../../shared/types/pokemon.types';

export interface RawPokemonResponse {
  name: string;
  id: number;
  order: number;
  sprites: {
    other: {
      ['official-artwork']?: {
        front_default?: string;
      };
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokemonCardState {
  pokemonData: PokemonData | null;
  isLoading: boolean;
  error: string | null;
}
