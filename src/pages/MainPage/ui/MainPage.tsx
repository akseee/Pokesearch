'use client';

import styles from './MainPage.module.css';
import { Loader } from '../../../shared/ui/Loader/Loader';
import {
  pokemonApi,
  useGetManyPokemonsQuery,
} from '../../../shared/api/pokemonApi';
import { useDispatch } from '../../../shared/config/store/store';
import { SearchForm } from '../../../features/SearchForm';
import { Pagination } from '../../../features/Pagination';
import { useParams } from 'next/navigation';
import { DetailedCardPage } from '../../DetailedCardPage';
import { ResultList } from '../../../widgets/ResultsList';
import { getErrorMessage } from '../../../shared/api/getErrorMessage';
import useSearchQueryParams from '../../../shared/hooks/useSearchQueryParams';

export const MainPage = () => {
  const { query, page, setQuery, setPage } = useSearchQueryParams();
  const params = useParams();

  const pokemonParam = params?.pokemon;

  const pokemon = Array.isArray(pokemonParam)
    ? pokemonParam[0]
    : pokemonParam || '';

  const {
    data: pokemonsData,
    isLoading,
    isFetching,
    error,
  } = useGetManyPokemonsQuery({ query, page });

  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'PokemonList', id: page }])
    );
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const loading = isLoading || isFetching;
  const errorMessage = getErrorMessage(error);

  const totalPages = pokemonsData ? Math.ceil(pokemonsData.count / 20) : 1;

  return (
    <div className={styles.wrapper}>
      <SearchForm
        query={query}
        onSubmit={handleSearch}
        onRefresh={handleRefresh}
        isLoading={loading}
      />
      <Pagination
        isLoading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className={`${styles.section} ${pokemon ? styles.detailed : ''}`}>
        <div className={styles['left-column']}>
          <ResultList
            pokemons={pokemonsData?.results || []}
            isLoading={loading}
            error={errorMessage || undefined}
          />
        </div>
        {pokemon && (
          <div className={styles['right-column']}>
            <DetailedCardPage />
          </div>
        )}
      </div>
      <Pagination
        isLoading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {loading && (
        <div className={styles.loader} data-testid="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
