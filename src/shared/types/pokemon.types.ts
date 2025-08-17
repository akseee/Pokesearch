export interface PokemonData {
  id: number;
  name: string;
  type: string;
  image?: string;
  stats: PokemonStats;
  order: number;
  description?: string | null;
}

export interface PokemonStats {
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  ['special-attack']?: number;
  ['special-defense']?: number;
}
