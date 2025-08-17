import { ReactNode } from 'react';
import { fetchManyPokemons } from '../../shared/api/pokemonServerApi';
import MainPage from '../MainPage';

export default async function Page({
  searchParams,
}: {
  children: ReactNode;
  searchParams: { query?: string; page?: string };
}) {
  const param = await searchParams;
  const query = param?.query || undefined;
  const page = param?.page ? parseInt(param.page, 10) : 1;

  try {
    const data = await fetchManyPokemons({ query, page });
    return <MainPage initialData={data} query={query || ''} page={page} />;
  } catch (error) {
    console.error('Failed to fetch pokemons:', error);
    return <div>Error loading data</div>;
  }
}
