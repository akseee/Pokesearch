import { fireEvent, render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';

const STORAGE_KEY = 'testKey';

describe('SearchForm ', () => {
  let onChangeMock: (value: string) => void;
  let onSearchMock: () => void;
  let currentValue: string;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    currentValue = '';
    onChangeMock = (val: string) => {
      currentValue = val;
    };
    onSearchMock = vi.fn(() =>
      localStorage.setItem(STORAGE_KEY, currentValue.trim())
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('renders search input and search button', () => {
      render(
        <SearchForm
          value=""
          onChange={onChangeMock}
          onSearch={onSearchMock}
          inputPlaceholder="Search…"
        />
      );
      const input = screen.getByPlaceholderText('Search…');
      const button = screen.getByRole('button', { name: /search/i });

      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test('shows empty input when no saved term exists', () => {
      const savedValue = localStorage.getItem(STORAGE_KEY) ?? '';
      render(
        <SearchForm
          value={savedValue}
          onChange={onChangeMock}
          onSearch={onSearchMock}
          inputPlaceholder="Search…"
        />
      );

      const input: HTMLInputElement = screen.getByRole('textbox');
      expect(input.value).toBe('');
    });
  });

  describe('LocalStorage Integration', () => {
    test('displays previously saved search term from localStorage on mount ', () => {
      localStorage.setItem(STORAGE_KEY, 'test');

      const savedValue = localStorage.getItem(STORAGE_KEY) ?? '';

      render(
        <SearchForm
          value={savedValue}
          onChange={onChangeMock}
          onSearch={onSearchMock}
          inputPlaceholder="Search…"
        />
      );
      const input: HTMLInputElement = screen.getByRole('textbox');
      expect(input.value).toBe('test');
    });

    test('overwrites existing localStorage value when new search is performed and saves search term to localStorage when search button is clicked', () => {
      localStorage.setItem(STORAGE_KEY, 'oldValue');

      render(
        <SearchForm
          value={currentValue}
          onChange={onChangeMock}
          onSearch={onSearchMock}
          inputPlaceholder="Search…"
        />
      );
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: '  newValue  ' } });
      fireEvent.click(button);

      expect(localStorage.getItem(STORAGE_KEY)).toBe('newValue');
      expect(onSearchMock).toHaveBeenCalledOnce();
    });
  });

  describe('User Interaction Tests', () => {
    test('updates input value when user types', () => {
      render(
        <SearchForm
          value={currentValue}
          onChange={onChangeMock}
          onSearch={onSearchMock}
          inputPlaceholder="Search…"
        />
      );
      const input: HTMLInputElement = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new search' } });
      expect(currentValue).toBe('new search');
    });
  });
});
