import { PokemonSkeletonCard } from './PokemonCardSkeleton';
import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';
import { usePokemonData } from '../model/usePokemonData';
import type { NamedAPIResource } from '../../../shared/types/api';
import { useNavigate } from 'react-router';

export const PokemonCard = ({ pokemon }: { pokemon: NamedAPIResource }) => {
  const { pokemonData, isLoading, error } = usePokemonData(pokemon);
  const navigate = useNavigate();

  const card = pokemonData && (
    <PokemonCardLayout
      onClick={() => navigate(`/${pokemon.name}`)}
      image={pokemonData.image}
      order={pokemonData.order}
      type={pokemonData.type}
      title={pokemonData.name}
      stats={pokemonData.stats}
    />
  );

  if (isLoading || !pokemonData) return <PokemonSkeletonCard />;

  if (error) {
    return <div>faield to laod data</div>;
  }

  return card;
};
