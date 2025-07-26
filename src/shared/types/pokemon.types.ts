export interface PokemonData {
  name: string;
  type: string;
  id: number;
  description: string;
  image: string;
  stats: PokemonStats;
  order: number;
}

export interface PokemonStats {
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  ['special-attack']?: number;
  ['special-defense']?: number;
}

export interface RawPokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}
