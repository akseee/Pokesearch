import { useEffect, useState } from 'react';
import type {
  ApiResponse,
  NamedAPIResource,
} from '../../../shared/types/api.types';
import { fetchPokemonsAPI } from '../../../shared/api/fetchPokemonsAPI';
import { initialStateApiResponse } from '../../../shared/lib/constants';

export const usePokemonsListData = (query: string, page: number) => {
  const [pokemonsData, setPokemonsData] =
    useState<ApiResponse<NamedAPIResource>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPokemonsAPI(query, page);

        setPokemonsData(data);
      } catch (e) {
        setError((e as Error).message);
        setPokemonsData(initialStateApiResponse);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  return { pokemonsData, isLoading, error };
};
