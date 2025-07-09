import type { PokemonData } from '../model/types';
import { PokemonCardLayout } from './PokemonCardLayout';

export const PokemonCardUI = ({ data }: { data: PokemonData }) => {
  return (
    <PokemonCardLayout
      image={<img src={data.image} alt={data.name} />}
      title={<h3>{data.name}</h3>}
      lines={[
        <p key="1">HP: {data.stats.hp}</p>,
        <p key="2">Attack: {data.stats.attack}</p>,
        <p key="3">Defense: {data.stats.defense}</p>,
        <p key="4">Speed: {data.stats.speed}</p>,
        <p key="5">Special defense: {data.stats['special-defense']}</p>,
        <p key="5">Special attack: {data.stats['special-attack']}</p>,
      ]}
    />
  );
};
