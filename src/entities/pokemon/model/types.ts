import type { PokemonData } from '../../../shared/types/pokemon.types';

export interface PokemonCardState {
  pokemonData: PokemonData | null;
  isLoading: boolean;
  error: string | null;
}
