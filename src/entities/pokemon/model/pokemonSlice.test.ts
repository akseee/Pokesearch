import {
  pokemonsReducer,
  pokemonsActions,
  getSpecificPokemonData,
} from './pokemonsSlice';
import type { PokemonData } from '../../../shared/types/pokemon.types';

describe('pokemonsSlice', () => {
  const pikachu: PokemonData = {
    name: 'pikachu',
    image: 'pikachu.png',
    order: 25,
    description: 'test',
    type: 'electric',
    stats: { hp: 23 },
    id: 25,
  };

  const bulbasaur: PokemonData = {
    name: 'bulbasaur',
    image: 'bulbasaur.png',
    order: 1,
    type: 'grass',
    description: 'test',
    stats: { hp: 23 },
    id: 26,
  };

  test('should add pokemon to store', () => {
    const state = { selectedPokemons: [] };

    const nextState = pokemonsReducer(
      state,
      pokemonsActions.addPokemon(pikachu)
    );

    expect(nextState.selectedPokemons).toEqual([pikachu]);
  });

  test('should not ad dpokemon in store if it is already stored', () => {
    const state = { selectedPokemons: [pikachu] };

    const nextState = pokemonsReducer(
      state,
      pokemonsActions.addPokemon(pikachu)
    );

    expect(nextState.selectedPokemons).toHaveLength(1);
  });

  test('should delete pokemon by name', () => {
    const state = { selectedPokemons: [pikachu, bulbasaur] };

    const nextState = pokemonsReducer(
      state,
      pokemonsActions.removePokemon({ name: 'pikachu' })
    );

    expect(nextState.selectedPokemons).toEqual([bulbasaur]);
  });

  test('should clear selected store', () => {
    const state = { selectedPokemons: [pikachu, bulbasaur] };

    const nextState = pokemonsReducer(state, pokemonsActions.clearPokemons());

    expect(nextState.selectedPokemons).toEqual([]);
  });
  test('getSpecificPokemonData should return true if pokemon is choosen', () => {
    const state = {
      pokemons: { selectedPokemons: [pikachu] },
    };

    const result = getSpecificPokemonData('pikachu')(state);

    expect(result).toBe(true);
  });

  test('getSpecificPokemonData should return false if pokemon is not stored', () => {
    const state = {
      pokemons: { selectedPokemons: [] },
    };

    const result = getSpecificPokemonData('pikachu')(state);

    expect(result).toBe(false);
  });
});
