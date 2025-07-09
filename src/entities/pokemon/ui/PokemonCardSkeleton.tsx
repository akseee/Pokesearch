import { PokemonCardLayout } from './PokemonCardLayout';

export const PokemonSkeletonCard = () => {
  const line = <div />;

  return (
    <PokemonCardLayout image={<div />} title={<div />} lines={[line, line]} />
  );
};
