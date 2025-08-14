'use client';
import {
  DetailedCard,
  PokemonSkeletonCard,
  usePokemonData,
} from '../../../entities/pokemon';
import { getErrorMessage } from '../../../shared/api/getErrorMessage';
import { useRouter } from '../../../shared/config/i18n/navigation';
import styles from './DetailedCardPage.module.css';
import { useParams } from 'next/navigation';

const DetailedCardPage = () => {
  const router = useRouter();
  const params = useParams();

  const pokemonParam = params?.pokemon;

  const pokemon = Array.isArray(pokemonParam)
    ? pokemonParam[0]
    : pokemonParam || '';

  const { pokemonData, isLoading, error } = usePokemonData(pokemon);

  const handleCloseClick = () => {
    router.push('/');
  };

  if (isLoading) {
    return <PokemonSkeletonCard />;
  }

  const errorMessage = getErrorMessage(error);

  return (
    <>
      <button className={styles.button} onClick={handleCloseClick}>
        &#9587;
      </button>
      {pokemonData ? (
        <DetailedCard
          key={pokemon}
          pokemonData={pokemonData}
          error={errorMessage || undefined}
        />
      ) : (
        <PokemonSkeletonCard />
      )}
    </>
  );
};

export default DetailedCardPage;
