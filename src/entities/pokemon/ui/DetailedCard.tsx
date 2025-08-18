import styles from './DetailedCard.module.css';
import { PokemonStatsList } from '../../../shared/ui/PokemonCardLayout/PokemonStatsList';
import Image from 'next/image';
import { PokemonData } from '../../../shared/types/pokemon.types';

export const DetailedCard = (data: PokemonData) => {
  return (
    <div
      data-id={data.name.toLowerCase()}
      className={styles['card-layout-wrapper']}
    >
      <div className={styles['image-container']}>
        <Image
          className={styles.image}
          src={data.image !== undefined ? data.image : '/placeholder.png'}
          alt={data.name}
          width={90}
          height={90}
        />
      </div>
      <div className={styles.title}>{data.name}</div>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.order}>
        {data.order !== -1
          ? `#${data.order.toString().padStart(3, '0')}`
          : 'yet to classify'}
      </div>
      <div className={styles.type}>{data.type}</div>
      <PokemonStatsList stats={data.stats} />
    </div>
  );
};
