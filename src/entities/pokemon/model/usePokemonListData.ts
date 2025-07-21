import { useEffect, useState } from 'react';
import type { NamedAPIResource } from '../../../shared/types/api';
import { fetchPokemonsAPI } from '../../../shared/api/fetchPokemonsAPI';

export const usePokemonsListData = (query: string) => {
  const [pokemonsData, setPokemonsData] = useState<NamedAPIResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPokemonsAPI(query);
        setPokemonsData(data.results);
      } catch (e) {
        setError((e as Error).message);
        setPokemonsData([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return { pokemonsData, isLoading, error };
};
