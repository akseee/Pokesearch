import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';

describe('Main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('../../../shared/lib/queryLocalStorage', () => ({
    queryLocalStorage: () => ({
      getQuery: () => 'pikachu',
      setQuery: vi.fn(),
    }),
  }));

  test('makes initial API call on component mount', async () => {
    render(<MainPage />);
    const text = await screen.findByText(/pikachu/i);
    expect(text).toBeInTheDocument();
  });

  test('handles search term from localStorage on initial load', async () => {
    render(<MainPage />);
    const text = await screen.findByDisplayValue('pikachu');
    expect(text).toBeInTheDocument();
  });

  test('manages loading states during API calls', () => {
    class LoadingMainPage extends MainPage {
      constructor(props: {
        query: string;
        pokemonResources: [];
        isLoading: boolean;
      }) {
        super(props);
        this.state = {
          query: 'test',
          pokemonResources: [],
          isLoading: true,
        };
      }
    }

    render(<LoadingMainPage />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
