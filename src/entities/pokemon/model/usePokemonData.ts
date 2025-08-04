import { useMemo } from 'react';
import {
  useGetDescriptionQuery,
  useGetOnePokemonQuery,
} from '../../../shared/api/pokemonApi';
import type { PokemonData } from '../../../shared/types/pokemon.types';

export const usePokemonData = (
  name: string
): {
  pokemonData: PokemonData | null;
  isLoading: boolean;
  error: unknown;
} => {
  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useGetOnePokemonQuery(name);

  const {
    data: description,
    isLoading: isDescriptionLoading,
    error: descriptionError,
  } = useGetDescriptionQuery(name, { skip: !pokemonData });

  const defaultDescription =
    'This mysterious Pokémon eludes our research — its secrets remain hidden in the shadows. Perhaps one day, brave trainers will unveil its true nature!';

  const combinedData = useMemo(() => {
    if (!pokemonData || isDescriptionLoading) return null;

    return {
      ...pokemonData,
      description:
        descriptionError || !description ? defaultDescription : description,
    };
  }, [pokemonData, description, descriptionError, isDescriptionLoading]);

  return {
    pokemonData: combinedData,
    isLoading: isPokemonLoading || isDescriptionLoading,
    error: pokemonError || descriptionError,
  };
};
