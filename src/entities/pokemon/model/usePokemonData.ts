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
    if (!pokemonData) return null;

    return {
      name: pokemonData.name,
      id: pokemonData.id,
      order: pokemonData.order,
      type: pokemonData.type || 'unknown',
      image: pokemonData.image || '',
      stats: pokemonData.stats || {},
      description:
        descriptionError || !description ? defaultDescription : description,
    };
  }, [pokemonData, description, descriptionError]);

  return {
    pokemonData: combinedData,
    isLoading: isPokemonLoading || (isDescriptionLoading && !!pokemonData),
    error: pokemonError || descriptionError,
  };
};
