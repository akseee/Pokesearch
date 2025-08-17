'use client';

import { DetailedCard } from '../../../entities/pokemon';
import { useRouter } from '../../../shared/config/i18n/navigation';
import { PokemonData } from '../../../shared/types/pokemon.types';
import styles from './DetailedCardPage.module.css';

interface DetailedCardPageProps {
  data: PokemonData;
}

export default function DetailedCardPage({ data }: DetailedCardPageProps) {
  const router = useRouter();

  const handleCloseClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleCloseClick}>
        &#9587;
      </button>
      <DetailedCard {...data} />
    </div>
  );
}
