import {
  useGetDescriptionQuery,
  useGetOnePokemonQuery,
} from '../../../shared/api/pokemonApi';

export const usePokemonData = (name: string) => {
  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useGetOnePokemonQuery(name);

  const {
    data: description,
    isLoading: isDescriptionLoading,
    error: descriptionError,
  } = useGetDescriptionQuery(name, {
    skip: !pokemonData,
  });

  const transformedData = pokemonData
    ? { ...pokemonData, description: description || pokemonData.description }
    : null;

  return {
    pokemonData: transformedData,
    isLoading: isPokemonLoading || isDescriptionLoading,
    error: pokemonError || descriptionError,
  };
};
