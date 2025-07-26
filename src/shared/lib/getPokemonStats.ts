import type { RawPokemonResponse } from '../../entities/pokemon/model/types';
import type { PokemonStats } from '../types/pokemon.types';

export function getPokemonStats(
  raw: RawPokemonResponse,
  statName: keyof PokemonStats
): number {
  const stat = raw.stats.find((s) => s.stat.name === statName);
  return stat?.base_stat ?? 0;
}
