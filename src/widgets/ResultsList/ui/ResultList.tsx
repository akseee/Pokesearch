import styles from './ResultList.module.css';
import { ListCard } from '../../../entities/pokemon';
import { PokemonData } from '../../../shared/types/pokemon.types';

export const ResultList = ({ pokemons }: { pokemons: PokemonData[] }) => {
  // const MIN_COUNT = 16;

  // if (error) {
  //   return (
  //     <div className={styles['result-wrapper']}>
  //       <div className={styles.error}>
  //         <p className={styles['error-message']}>{error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isLoading) {
  //   const skeletons = Array.from({ length: MIN_COUNT }, (_, i) => (
  //     <PokemonSkeletonCard key={`skeleton-${i}`} />
  //   ));
  //   return <ul className={styles['result-wrapper']}>{skeletons}</ul>;
  // }

  const cards = pokemons.map((pokemon: PokemonData) => (
    <ListCard pokemon={pokemon} key={pokemon.name} />
  ));

  return <ul className={styles['result-wrapper']}>{cards}</ul>;
};
