import { ResultList } from '../../../widgets/ResultsList/ui/ResultList';
import { SearchForm } from '../../../features/SearchForm';
import styles from './MainPage.module.css';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { Pagination } from '../../../features/Pagination';
import { Outlet, useParams } from 'react-router';
import { useSearchQueryParams } from '../../../shared/hooks/useSearchQueryParams';
import { usePokemonsListData } from '../../../entities/pokemon';

export const MainPage = () => {
  const { query, page, setQuery, setPage } = useSearchQueryParams();
  const { pokemon } = useParams();

  const { pokemonsData, isLoading, error } = usePokemonsListData(query, page);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.wrapper}>
      <SearchForm query={query} onSubmit={handleSearch} />
      <Pagination
        page={page}
        totalPages={(pokemonsData && Math.ceil(pokemonsData?.count / 20)) || 1}
        onPageChange={handlePageChange}
      />

      <div className={`${styles.section} ${pokemon ? styles.detailed : ''}`}>
        <div className={styles['left-column']}>
          <ResultList
            pokemons={pokemonsData?.results || []}
            isLoading={isLoading}
            error={error}
          />
        </div>
        {pokemon && (
          <div className={styles['right-column']}>
            <Outlet />
          </div>
        )}
      </div>

      {isLoading && (
        <div className={styles.loader} data-testid="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
