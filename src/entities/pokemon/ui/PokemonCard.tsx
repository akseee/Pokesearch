import { PokemonSkeletonCard } from './PokemonCardSkeleton';
import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';
import { usePokemonData } from '../model/usePokemonData';
import type { NamedAPIResource } from '../../../shared/types/api.types';
import { useLocation, useNavigate } from 'react-router';

export const PokemonCard = ({ pokemon }: { pokemon: NamedAPIResource }) => {
  const { pokemonData, isLoading, error } = usePokemonData(pokemon);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const search = location.search;
    navigate({ pathname: `/pokemon/${pokemon.name}`, search });
  };

  const card = pokemonData && (
    <PokemonCardLayout
      onClick={handleClick}
      image={pokemonData.image}
      order={pokemonData.order}
      type={pokemonData.type}
      title={pokemonData.name}
    />
  );

  if (isLoading || !pokemonData) return <PokemonSkeletonCard />;

  if (error) {
    return <div>faield to laod data</div>;
  }

  return card;
};
