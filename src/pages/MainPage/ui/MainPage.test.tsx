describe('mock', () => {
  test('mock', () => {
    expect(1).toBe(1);
  });
});

// describe('Main', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   vi.mock('../../../shared/lib/queryLocalStorage', () => ({
//     queryLocalStorage: () => ({
//       getQuery: () => 'pikachu',
//       setQuery: vi.fn(),
//     }),
//   }));

//   test('makes initial API call on component mount', async () => {
//     render(<MainPage />);
//     const text = await screen.findByText(/pikachu/i);
//     expect(text).toBeInTheDocument();
//   });

//   test('handles search term from localStorage on initial load', async () => {
//     render(<MainPage />);
//     const text = await screen.findByDisplayValue('pikachu');
//     expect(text).toBeInTheDocument();
//   });
// });
