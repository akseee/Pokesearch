import { Metadata } from 'next';
import { PokemonData } from '../../../../shared/types/pokemon.types';
import {
  fetchManyPokemons,
  fetchOnePokemon,
} from '../../../../shared/api/pokemonServerApi';
import MainPage from '../../../MainPage';

export const metadata: Metadata = {
  title: 'PokéDexplorer. Pokémon',
  description: 'Here you can look at detailed information of any pokemon!',
};
export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
  params: Promise<{ pokemon: string }>;
}) {
  const { pokemon } = await params;
  const pokemonData: PokemonData = await fetchOnePokemon(pokemon);

  const param = await searchParams;
  const query = param?.query || undefined;
  const page = param?.page ? parseInt(param.page, 10) : 1;

  const data = await fetchManyPokemons({ query, page });
  return (
    <MainPage
      initialData={data}
      query={query || ''}
      page={page}
      details={pokemonData}
    />
  );
}
