import { Metadata } from 'next';
import { MainPage } from '../../../../pages/MainPage';

export const metadata: Metadata = {
  title: 'PokéDexplorer. Pokémon',
  description: 'Here you can look at detailed information of any pokemon!',
};

const Page = () => <MainPage />;
export default Page;
