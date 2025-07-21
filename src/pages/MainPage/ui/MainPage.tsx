import { ResultList } from '../../../widgets/ResultsList/ui/ResultList';
import { SearchForm } from '../../../features/SearchForm';
import styles from './MainPage.module.css';
import { queryLocalStorage } from '../../../shared/lib/queryLocalStorage';
import { usePokemonsListData } from '../../../entities/pokemon/model/usePokemonListData';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { Pagination } from '../../../features/Pagination';
import { useSearchQueryParams } from '../model/useSearchQueryParams';

export const MainPage = () => {
  const { query, page, setQuery, setPage } = useSearchQueryParams();

  const { pokemonsData, isLoading, error } = usePokemonsListData(query, page);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    queryLocalStorage().setQuery(newQuery);
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

      <div className={styles.section}>
        <ResultList
          pokemons={pokemonsData?.results || []}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {isLoading && (
        <div className={styles.loader} data-testid="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
