import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';

export const PokemonSkeletonCard = () => {
  const line = <div />;

  return (
    <PokemonCardLayout
      loading={true}
      image={<div />}
      title={<div />}
      lines={[line, line]}
    />
  );
};
