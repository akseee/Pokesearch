import type { NamedAPIResource } from '../../../shared/types/api';
import type { PokemonData, RawPokemonResponse } from './types';

export async function fetchOnePokemonData(
  resource: NamedAPIResource
): Promise<PokemonData> {
  const res = await fetch(resource.url);
  const data: RawPokemonResponse = await res.json();

  const statMap: Record<string, number> = {};

  for (const s of data.stats) {
    statMap[s.stat.name] = s.base_stat;
  }

  const image =
    data.sprites.other['official-artwork']?.front_default ||
    data.sprites.other.dream_world?.front_default ||
    '';

  return {
    name: data.name,
    id: data.id,
    order: data.order,
    type: data.types[0]?.type.name || 'unknown',
    image,
    stats: {
      hp: statMap['hp'] || 0,
      attack: statMap['attack'] || 0,
      defense: statMap['defense'] || 0,
      speed: statMap['speed'] || 0,
      ['special-attack']: statMap['special-attack'] || 0,
      ['special-defense']: statMap['special-defense'] || 0,
    },
  };
}
