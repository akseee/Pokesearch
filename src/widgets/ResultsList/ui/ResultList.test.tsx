import { describe, expect, test, vi } from 'vitest';
import type { NamedAPIResource } from '../../../shared/types/api';
import { ResultList } from './ResultList';
import { render, screen } from '@testing-library/react';

vi.mock('../../../entities/pokemon/ui/PokemonCard', () => ({
  PokemonCard: ({ name, url }: { name: string; url: string }) => (
    <li data-testid="pokemon-card">
      {name} - {url}
    </li>
  ),
}));

vi.mock('../../../entities/pokemon/ui/PokemonCardSkeleton', () => ({
  PokemonSkeletonCard: () => <li data-testid="skeleton-card" />,
}));

describe('ResultList', () => {
  const mockData: NamedAPIResource[] = [
    { name: 'bulbasaur', url: '/url-1' },
    { name: 'ivysaur', url: '/url-2' },
    { name: 'venusaur', url: '/url-3' },
  ];

  describe('Rendering', () => {
    test('renders correct number of items when data is provided', () => {
      render(<ResultList isLoading={false} pokemons={mockData} />);
      const cards = screen.getAllByTestId('pokemon-card');
      expect(cards.length).toBe(mockData.length);
    });

    test('displays "no results" message when data array is empty and not loading', () => {
      render(<ResultList isLoading={false} pokemons={[]} />);
      expect(screen.getByText(/No Pokémon found/i)).toBeInTheDocument();
    });

    test('shows loading state while fetching data', () => {
      render(<ResultList isLoading={true} pokemons={[]} />);
      const skeletons = screen.getAllByTestId('skeleton-card');
      expect(skeletons.length).toBeGreaterThanOrEqual(8);
    });
  });
});
