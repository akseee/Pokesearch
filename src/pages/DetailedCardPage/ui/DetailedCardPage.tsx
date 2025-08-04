import { useLocation, useNavigate, useParams } from 'react-router';
import styles from './DetailedCardPage.module.css';
import { DetailedCard, usePokemonData } from '../../../entities/pokemon';

export const DetailedCardPage = () => {
  const { pokemon } = useParams();
  const pokemonName = pokemon ?? '';

  const { pokemonData, isLoading } = usePokemonData(pokemonName);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseClick = () => {
    const search = location.search;
    navigate({ pathname: '/', search });
  };

  return (
    <>
      <button className={styles.button} onClick={handleCloseClick}>
        &#9587;
      </button>

      {pokemonData && (
        <DetailedCard
          pokemonData={pokemonData}
          isLoading={isLoading}
          error={null}
        />
      )}
    </>
  );
};
