import { PokemonSkeletonCard } from './PokemonCardSkeleton';
import styles from './DetailedCard.module.css';
import { Loader } from '../../../shared/ui/Loader/Loader';
import PokemonStatsList from '../../../shared/ui/PokemonCardLayout/PokemonStatsList';
import type { PokemonData } from '../../../shared/types/pokemon.types';

export const DetailedCard = ({
  pokemonData,
  isLoading,
  error,
}: {
  pokemonData: PokemonData | null;
  isLoading: boolean;
  error: string | null;
}) => {
  if (isLoading || !pokemonData) return <PokemonSkeletonCard />;

  if (error) {
    return (
      <div className={styles['card-layout-wrapper']}>failed to load data</div>
    );
  }

  const { name, image, description, stats, type, order } = pokemonData;
  return (
    <div data-id={name.toLowerCase()} className={styles['card-layout-wrapper']}>
      <div className={styles['image-container']}>
        {isLoading ? (
          <div className={styles.image}>
            <Loader />
          </div>
        ) : (
          <img
            className={styles.image}
            src={image !== '' ? image : './placeholder.png'}
            alt={name}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.title}>{name}</div>
      <p className={styles.description}>{description}</p>
      <div className={styles.order}>
        {order !== -1
          ? `#${order.toString().padStart(3, '0')}`
          : 'yet to classify'}
      </div>
      <div className={styles.type}>{type}</div>
      <PokemonStatsList stats={stats} />
    </div>
  );
};
