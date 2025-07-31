import { describe, expect, test } from 'vitest';
import type { NamedAPIResource } from '../../../shared/types/api.types';
import { ResultList } from './ResultList';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('mock', () => {
  test('mock', () => {
    expect(1).toBe(1);
  });
});

vi.mock('../../../entities/pokemon/ui/ListCard', () => ({
  ListCard: ({ name, url }: { name: string; url: string }) => (
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

  test('renders correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <ResultList isLoading={false} pokemons={mockData} error={null} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards.length).toBe(mockData.length);
  });

  test('displays "no results" message when data array is empty and not loading and error is present', () => {
    render(
      <MemoryRouter>
        <ResultList
          isLoading={false}
          pokemons={[]}
          error={'No Pokémon found'}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/No Pokémon found/i)).toBeInTheDocument();
  });

  test('shows loading skeletons when loading', () => {
    render(
      <MemoryRouter>
        <ResultList isLoading={true} pokemons={[]} error={null} />
      </MemoryRouter>
    );
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons.length).toBeGreaterThanOrEqual(8);
  });
});
