import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../lib/constants';
import { useCallback, useEffect } from 'react';
import { useRouter, usePathname } from '../config/i18n/navigation';

function useSearchQueryParams() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { queryLS, setQueryLS } = useLocalStorage(STORAGE_KEYS.POKEMON_QUERY);

  const query = params?.get('query') ?? '';
  const page = Number(params?.get('page')) || 1;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const param = new URLSearchParams(params?.toString());
      param.set(name, value);
      return param.toString();
    },
    [params]
  );

  const setQuery = (newQuery: string) => {
    setQueryLS(newQuery);
    router.push(pathname + '?' + createQueryString('query', newQuery));
  };

  const setPage = (newPage: number) => {
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  };

  useEffect(() => {
    if (!query && queryLS) {
      router.replace(pathname + '?' + createQueryString('query', queryLS));
    }
  }, [query, queryLS, pathname, router, createQueryString]);

  return { query, page, setQuery, setPage };
}
export default useSearchQueryParams;
