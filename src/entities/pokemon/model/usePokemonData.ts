import { useEffect, useState } from 'react';
import type { PokemonData } from '../../../shared/types/pokemon';
import type { NamedAPIResource } from '../../../shared/types/api';
import type { PokemonCardState, RawPokemonResponse } from './types';
import { tranformPokemonData } from './transformPokemonData';
import { pokemonCache } from '../../../shared/lib/cache';
import { BASE_API } from '../../../shared/lib/constants';

export const usePokemonData = (
  source: NamedAPIResource | string
): PokemonCardState => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!source) return;

    async function fetchData() {
      // think about flag of demounted component
      setIsLoading(true);
      setError(null);

      try {
        const name = typeof source === 'string' ? source : source.name;
        const url =
          typeof source === 'string' ? `${BASE_API}${name}` : source.url;

        if (pokemonCache.has(name)) {
          const data = pokemonCache.get(name);
          setPokemonData(data ?? null);

          return;
        } else {
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(
              `Card loading error: ${res.status} ${res.statusText}`
            );
          }

          const raw: RawPokemonResponse = await res.json();
          const parsed = tranformPokemonData(raw);

          setPokemonData(parsed);
          pokemonCache.set(name, parsed);

          return;
        }
      } catch (e) {
        setError((e as Error).message);
        setPokemonData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [source]);

  return { pokemonData, isLoading, error };
};
