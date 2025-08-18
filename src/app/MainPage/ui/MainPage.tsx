import styles from './MainPage.module.css';
import { SearchForm } from '../../../features/SearchForm';
import { Pagination } from '../../../features/Pagination';
import { PokemonData } from '../../../shared/types/pokemon.types';
import { ApiResponse } from '../../../shared/api/api.types';
import { ResultList } from '../../../widgets/ResultsList';
import DetailedCardPage from '../../DetailedCardPage';

export default async function MainPage({
  initialData,
  query,
  page,
  details,
}: {
  initialData: ApiResponse<PokemonData>;
  query: string;
  page: number;
  details?: PokemonData | null;
}) {
  const totalPages = Math.ceil(initialData.count / 20);

  return (
    <div className={styles.wrapper}>
      <SearchForm initialQuery={query} />
      <Pagination page={page || 1} totalPages={totalPages} />

      <div className={`${styles.section} ${details && styles.detailed}`}>
        <div className={styles['left-column']}>
          <ResultList pokemons={initialData.results} />
        </div>
        {details && (
          <div className={styles['right-column']}>
            <DetailedCardPage data={details} />
          </div>
        )}
      </div>
      <Pagination page={page || 1} totalPages={totalPages} />
    </div>
  );
}
