export interface PokemonData {
  name: string;
  type: string;
  id: number;
  image: string;
  stats: PokemonStats;
  order: number;
}

export interface RawPokemonResponse {
  name: string;
  id: number;
  order: number;
  sprites: {
    other: {
      ['official-artwork']?: {
        front_default?: string;
      };
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  ['special-attack']: number;
  ['special-defense']: number;
}
