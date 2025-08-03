import { useLocation, useNavigate, useParams } from 'react-router';
import styles from './DetailedCardPage.module.css';
import { DetailedCard, usePokemonData } from '../../../entities/pokemon';

export const DetailedCardPage = () => {
  const { pokemon } = useParams();
  const pokemonName = pokemon ?? '';

  const { pokemonData, isLoading, error } = usePokemonData(pokemonName);

  const navigate = useNavigate();
  const location = useLocation();

  if (error) {
    return (
      <div style={{ color: 'red', padding: 20, textAlign: 'center' }}>
        <h2>Error loading Pokémon</h2>
        <p>{error}</p>
      </div>
    );
  }

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
          error={error || null}
        />
      )}
    </>
  );
};
