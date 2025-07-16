import { render, screen, waitFor } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

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

const mockApiData = {
  name: 'pikachu',
  id: 25,
  order: 25,
  types: [{ type: { name: 'electric' } }],
  sprites: {
    other: {
      'official-artwork': { front_default: 'image-url' },
      dream_world: { front_default: null },
    },
  },
  stats: [
    { stat: { name: 'hp' }, base_stat: 35 },
    { stat: { name: 'attack' }, base_stat: 55 },
    { stat: { name: 'defense' }, base_stat: 40 },
    { stat: { name: 'speed' }, base_stat: 90 },
    { stat: { name: 'special-attack' }, base_stat: 50 },
    { stat: { name: 'special-defense' }, base_stat: 50 },
  ],
};

describe('PokemonCard', () => {
  test('displays item name and description correctly', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockApiData,
    });

    render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/pikachu"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-layout')).toBeInTheDocument();
    });

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
  });
});
