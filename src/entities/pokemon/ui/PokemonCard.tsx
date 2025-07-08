import type { PokemonData } from '../model/types';

export const PokemonCardUI = ({ data }: { data: PokemonData }) => (
  <div>
    <img src={data.image} />
    <h3>{data.name}</h3>
    <p>Speed: {data.stats.speed}</p>
  </div>
);
