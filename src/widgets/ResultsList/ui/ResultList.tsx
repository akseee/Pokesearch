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
    console.log(pokemons);

    if (isLoading) {
      return (
        <div>
          {[...Array(9)].map((_, i) => (
            <PokemonSkeletonCard key={i} />
          ))}
        </div>
      );
    }

    if (!pokemons.length) {
      return (
        <div>
          <p>No Pokémons found.</p>
        </div>
      );
    }

    return (
      <ul className={styles['result-wrapper']}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </ul>
    );
  }
}
