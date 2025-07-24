import {
  mockPokemonResponse,
  mockSpeciesResponse,
} from '../../../shared/lib/mocks';
import { tranformPokemonData } from './transformPokemonData';

describe('trasnformPokemonData', () => {
  test('should correctly parse data', () => {
    const descriptionEntry = mockSpeciesResponse.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );
    const description = descriptionEntry ? descriptionEntry.flavor_text : null;

    const data = tranformPokemonData(mockPokemonResponse, description);

    expect(data.name).toBe('pikachu');
    expect(data.id).toBe(25);
    expect(data.type).toBe('electric');
    expect(data.image).toBe('image-url');
    expect(data.description).toBe('This is a test description');

    expect(data.stats.hp).toBe(35);
    expect(data.stats.attack).toBe(55);
  });
});
