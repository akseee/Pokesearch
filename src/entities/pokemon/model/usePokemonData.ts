import { useEffect, useState } from 'react';
import type {
  PokemonData,
  RawPokemonSpeciesResponse,
} from '../../../shared/types/pokemon';
import type { NamedAPIResource } from '../../../shared/types/api';
import type { PokemonCardState, RawPokemonResponse } from './types';
import { tranformPokemonData } from './transformPokemonData';
import { pokemonCache } from '../../../shared/lib/cache';
import { BASE_API, SPECIES_API } from '../../../shared/lib/constants';

export const usePokemonData = (
  source: NamedAPIResource | string
): PokemonCardState => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!source) return;

    async function fetchDescriptionData(name: string) {
      try {
        const res = await fetch(`${SPECIES_API}${name}`);

        const data: RawPokemonSpeciesResponse = await res.json();

        const entry = data.flavor_text_entries.find(
          (e) => e.language.name === 'en'
        );

        return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : null;
      } catch (e) {
        console.log(e);
        return null;
      }
    }

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
        }
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(
            `Card loading error: ${res.status} ${res.statusText}`
          );
        }

        const raw: RawPokemonResponse = await res.json();

        const description = await fetchDescriptionData(name);
        const parsed = tranformPokemonData(raw, description);

        setPokemonData(parsed);
        pokemonCache.set(name, parsed);
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
