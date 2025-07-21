import { ErrorButton } from '../../../features/ErrorButton';
import { ResultList } from '../../../widgets/ResultsList/ui/ResultList';
import { SearchForm } from '../../../features/SearchForm';
import styles from './MainPage.module.css';
import { ErrorBoundary } from '../../../shared/ui/errorBoundary/ErrorBoundary';
import { useState } from 'react';
import { queryLocalStorage } from '../../../shared/lib/queryLocalStorage';
import { usePokemonsListData } from '../../../entities/pokemon/model/usePokemonListData';
import { Loader } from '../../../shared/ui/Loader/Loader';

export const MainPage = () => {
  const [query, setQuery] = useState(queryLocalStorage().getQuery());
  // const { pokemon } = useParams();

  const { pokemonsData, isLoading, error } = usePokemonsListData(query);

  const onSearch = (newQuery: string) => {
    setQuery(newQuery);
    queryLocalStorage().setQuery(newQuery);
  };

  return (
    <div className={styles.wrapper}>
      <SearchForm query={query} onSubmit={onSearch} />
      <ErrorBoundary>
        {error && <div>Error: {error}</div>}
        <ResultList pokemons={pokemonsData} isLoading={isLoading} />
        <ErrorButton />
      </ErrorBoundary>
      {isLoading && (
        <div className={styles.loader} data-testid="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
