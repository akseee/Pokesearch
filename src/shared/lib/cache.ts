import type { PokemonData } from '../types/pokemon';

const cache = new Map<string, PokemonData>();

export const pokemonCache = {
  get(name: string): PokemonData | undefined {
    return cache.get(name);
  },
  set(name: string, data: PokemonData) {
    cache.set(name, data);
  },
  has(name: string): boolean {
    return cache.has(name);
  },
  clear() {
    cache.clear();
  },
};
