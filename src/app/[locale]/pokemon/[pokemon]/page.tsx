import { Metadata } from 'next';
import DetailedCardPage from '../../../DetailedCardPage';

export const metadata: Metadata = {
  title: 'PokéDexplorer. Pokémon',
  description: 'Here you can look at detailed information of any pokemon!',
};

const Page = () => <DetailedCardPage />;
export default Page;
