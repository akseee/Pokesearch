import { Metadata } from 'next';
import { PokemonData } from '../../../../shared/types/pokemon.types';
import { fetchOnePokemon } from '../../../../shared/api/pokemonServerApi';
import DetailedCardPage from '../../../DetailedCardPage';

export const metadata: Metadata = {
  title: 'PokéDexplorer. Pokémon',
  description: 'Here you can look at detailed information of any pokemon!',
};
export default async function Page({
  params,
}: {
  params: Promise<{ pokemon: string }>;
}) {
  const { pokemon } = await params;
  const pokemonData: PokemonData = await fetchOnePokemon(pokemon);
  return <DetailedCardPage data={pokemonData} />;
}
