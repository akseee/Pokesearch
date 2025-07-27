const mockUsePokemonData = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../../entities/pokemon/model/usePokemonData', () => ({
  usePokemonData: (name: string) => mockUsePokemonData(name),
}));

import { MemoryRouter } from 'react-router';
import { mockDetailedCardData } from '../../../shared/lib/mocks';
import { render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useParams: () => ({ pokemon: 'pikachu' }),
    useLocation: () => ({ search: '?query=pikachu' }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../../shared/ui/PokemonCardLayout/PokemonCardLayout', () => ({
  PokemonCardLayout: ({
    title,
    type,
    description,
    order,
  }: {
    title: string;
    type: string;
    description: string;
    order: number;
  }) => (
    <div data-testid="pokemon-layout">
      <div>{title}</div>
      <div>{type}</div>
      <div>#{String(order).padStart(3, '0')}</div>
      <p>{description}</p>
    </div>
  ),
}));

describe('DetailedCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonCardLayout with correct data', () => {
    mockUsePokemonData.mockReturnValue({
      pokemonData: mockDetailedCardData,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('pokemon-layout')).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/#025/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
  });

  test('renders error message when error occurs', () => {
    mockUsePokemonData.mockReturnValue({
      pokemonData: null,
      isLoading: false,
      error: 'Error loading data',
    });

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    expect(screen.getByText('Error loading Pokémon')).toBeInTheDocument();
  });

  test('calls navigate when close button clicked', async () => {
    mockUsePokemonData.mockReturnValue({
      pokemonData: mockDetailedCardData,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const closeButton = screen.getByRole('button');

    await user.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '?query=pikachu',
    });
  });
});
