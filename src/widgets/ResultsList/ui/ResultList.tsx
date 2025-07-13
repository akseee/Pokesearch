import { Component } from 'react';
import type { NamedAPIResource } from '../../../shared/types/api';
import { PokemonSkeletonCard } from '../../../entities/pokemon/ui/PokemonCardSkeleton';
import { PokemonCard } from '../../../entities/pokemon/ui/PokemonCard';
import styles from './ResultList.module.css';

interface ResultListProps {
  isLoading: boolean;
  pokemons: NamedAPIResource[];
}

export class ResultList extends Component<ResultListProps> {
  render() {
    const { pokemons, isLoading } = this.props;
    const MIN_COUNT = 8;

    const cards = pokemons.map((pokemon) => (
      <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
    ));

    const skeletons = Array.from({ length: MIN_COUNT }, (_, i) => (
      <PokemonSkeletonCard key={`skeleton-${i}`} />
    ));

    if (!isLoading && pokemons.length === 0) {
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
  }
}
