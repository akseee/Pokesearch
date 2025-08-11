import {
  DetailedCard,
  PokemonSkeletonCard,
  usePokemonData,
} from '../../../entities/pokemon';
import { getErrorMessage } from '../../../shared/api/getErrorMessage';
import styles from './page.module.css';

export const DetailedCardPage = () => {
  // const { pokemon } = useParams();
  // const pokemonName = pokemon ?? '';
  const pokemonName = 'pikachu';

  // const { pokemonData, isLoading, error } = usePokemonData(pokemonName);
  const { pokemonData, isLoading, error } = usePokemonData(pokemonName);

  // const navigate = useNavigate();
  // const location = useLocation();

  const handleCloseClick = () => {
    // const search = location.search;
    // navigate({ pathname: '/', search });
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
          key={pokemonName}
          pokemonData={pokemonData}
          error={errorMessage || undefined}
        />
      ) : (
        <PokemonSkeletonCard />
      )}
    </>
  );
};
