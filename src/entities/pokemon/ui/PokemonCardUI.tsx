import type { PokemonData } from '../../../shared/types/pokemon';
import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';

export const PokemonCardUI = ({ data }: { data: PokemonData }) => {
  return (
    <PokemonCardLayout
      image={data.image}
      order={data.order}
      type={data.type}
      title={data.name}
      stats={data.stats}
    />
  );
};
