import type { NamedAPIResource } from '../../../shared/types/api.types';
import { PokemonSkeletonCard } from '../../../entities/pokemon/ui/PokemonCardSkeleton';
import styles from './ResultList.module.css';
import { ListCard } from '../../../entities/pokemon/ui/ListCard';

interface ResultListProps {
  isLoading: boolean;
  pokemons: NamedAPIResource[];
  error?: string | null;
}

export const ResultList = ({ pokemons, isLoading, error }: ResultListProps) => {
  const MIN_COUNT = 16;

  const cards = pokemons?.map((pokemon: NamedAPIResource) => (
    <ListCard pokemon={pokemon} key={pokemon.name} />
  ));

  const skeletons = Array.from({ length: MIN_COUNT }, (_, i) => (
    <PokemonSkeletonCard key={`skeleton-${i}`} />
  ));

  if (error && !isLoading) {
    return (
      <div className={styles.empty}>
        <p>No Pokémon found...</p>
      </div>
    );
  }

  return (
    <ul className={styles['result-wrapper']}>
      {isLoading ? skeletons : cards}
    </ul>
  );
};
