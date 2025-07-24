import { MemoryRouter } from 'react-router';
import { PokemonCard } from './PokemonCard';
import { render, screen, waitFor } from '@testing-library/react';
import { mockCardData } from '../../../shared/lib/mocks';

vi.mock('../../../shared/ui/PokemonCardLayout/PokemonCardLayout', () => ({
  PokemonCardLayout: ({
    title,
    type,
    order,
  }: {
    title: string;
    type: string;
    order: number;
  }) => (
    <div data-testid="pokemon-layout">
      <div>{title}</div>
      <div>{type}</div>
      <div>#{String(order).padStart(3, '0')}</div>
    </div>
  ),
}));

vi.mock('./PokemonCardSkeleton', () => ({
  PokemonSkeletonCard: () => <div data-testid="loading" />,
}));

describe('PokemonCard', () => {
  test('displays item name and description correctly', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockCardData,
    });

    render(
      <MemoryRouter>
        <PokemonCard
          pokemon={{
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
          }}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-layout')).toBeInTheDocument();
    });

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
  });
});
