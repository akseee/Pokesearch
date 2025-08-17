import styles from './MainPage.module.css';
import { SearchForm } from '../../../features/SearchForm';
import { Pagination } from '../../../features/Pagination';
import { ReactNode } from 'react';
import { PokemonData } from '../../../shared/types/pokemon.types';
import { ApiResponse } from '../../../shared/api/api.types';
import { ResultList } from '../../../widgets/ResultsList';

export default async function MainPage({
  children,
  initialData,
  query,
  page,
}: {
  children: ReactNode;
  initialData: ApiResponse<PokemonData>;
  query: string;
  page: number;
}) {
  const totalPages = Math.ceil(initialData.count / 20);

  return (
    <div className={styles.wrapper}>
      <SearchForm initialQuery={query} />
      <Pagination page={page || 1} totalPages={totalPages} />

      <div className={`${styles.section} `}>
        <div className={styles['left-column']}>
          <ResultList pokemons={initialData.results} />
        </div>
        {children}
      </div>
      <Pagination page={page || 1} totalPages={totalPages} />
    </div>
  );
}
