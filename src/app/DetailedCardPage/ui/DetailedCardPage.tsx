'use client';

import { useSearchParams } from 'next/navigation';
import { DetailedCard } from '../../../entities/pokemon';
import { useRouter } from '../../../shared/config/i18n/navigation';
import { PokemonData } from '../../../shared/types/pokemon.types';
import styles from './DetailedCardPage.module.css';

interface DetailedCardPageProps {
  data: PokemonData;
}

export default function DetailedCardPage({ data }: DetailedCardPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCloseClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    router.push(`/?${params.toString()}`, { scroll: false });
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
