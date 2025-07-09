export interface PokemonData {
  name: string;
  type: string;
  id: number;
  image: string;
  stats: PokemonStats;
  order: number;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  ['special-attack']: number;
  ['special-defense']: number;
}
