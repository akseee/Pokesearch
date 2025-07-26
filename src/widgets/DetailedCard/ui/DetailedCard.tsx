import { useLocation, useNavigate, useParams } from 'react-router';
import { usePokemonData } from '../../../entities/pokemon/model/usePokemonData';
import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';
import styles from './DetailedCard.module.css';

export const DetailedCard = () => {
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
        <PokemonCardLayout
          loading={isLoading}
          image={pokemonData.image}
          order={pokemonData.order}
          type={pokemonData.type}
          title={pokemonData.name}
          description={pokemonData.description}
          stats={pokemonData.stats}
        />
      )}
    </>
  );
};
