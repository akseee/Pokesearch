import { useSearchParams } from 'react-router';

export function useSearchQueryParams() {
  const [params, setParams] = useSearchParams();

  const query = params.get('query') ?? '';
  const page = Number(params.get('page')) || 1;

  const setQuery = (newQuery: string) => {
    setParams((prev) => {
      prev.set('query', newQuery);
      prev.set('page', '1');
      return prev;
    });
  };

  const setPage = (newPage: number) => {
    setParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  return { query, page, setQuery, setPage };
}
