import { Component } from 'react';
import type { RawPokemonResponse } from '../model/types';
import { PokemonSkeletonCard } from './PokemonCardSkeleton';
import type { NamedAPIResource } from '../../../shared/types/api';
import type { PokemonData, PokemonStats } from '../../../shared/types/pokemon';
import { pokemonCache } from '../../../shared/lib/cache';
import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';

interface PokemonCardState {
  data: PokemonData | null;
  isLoading: boolean;
  error: string | null;
}

export class PokemonCard extends Component<NamedAPIResource, PokemonCardState> {
  state: PokemonCardState = {
    data: null,
    isLoading: true,
    error: null,
  };

  componentDidUpdate(prevProps: NamedAPIResource) {
    if (prevProps.url !== this.props.url) {
      this.setState({ isLoading: true, error: null });
      this.fetchPokemon();
    }
  }

  componentDidMount() {
    const key = this.props.name;

    if (pokemonCache.has(key)) {
      this.setState({
        data: pokemonCache.get(key) || null,
        isLoading: false,
      });
    } else {
      this.fetchPokemon();
    }
  }

  async fetchPokemon() {
    try {
      const res = await fetch(this.props.url);

      if (!res.ok) {
        throw new Error(`Card loading error: ${res.status} ${res.statusText}`);
      }
      const raw: RawPokemonResponse = await res.json();

      const statsObj: PokemonData['stats'] = {
        hp: this.getStat(raw, 'hp'),
        attack: this.getStat(raw, 'attack'),
        defense: this.getStat(raw, 'defense'),
        speed: this.getStat(raw, 'speed'),
        ['special-attack']: this.getStat(raw, 'special-attack'),
        ['special-defense']: this.getStat(raw, 'special-defense'),
      };

      const image =
        raw.sprites.other['official-artwork']?.front_default ||
        raw.sprites.other.dream_world?.front_default ||
        '';

      const data: PokemonData = {
        name: raw.name,
        id: raw.id,
        order: raw.order,
        type: raw.types[0]?.type.name || 'unknown',
        image,
        stats: statsObj,
      };

      pokemonCache.set(this.props.name.toLowerCase(), data);

      this.setState({ data, isLoading: false });
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Failed to load data', isLoading: false });
    }
  }

  getStat(raw: RawPokemonResponse, statName: keyof PokemonStats): number {
    const stat = raw.stats.find((s) => s.stat.name === statName);
    return stat?.base_stat ?? 0;
  }

  render() {
    const { data, isLoading, error } = this.state;

    if (isLoading) {
      return <PokemonSkeletonCard />;
    }

    if (error || !data)
      return (
        <div>
          <div>Error loading pokemons data</div>
          <button onClick={() => this.fetchPokemon()}>Retry</button>
        </div>
      );

    return (
      <PokemonCardLayout
        image={data.image}
        order={data.order}
        type={data.type}
        title={data.name}
        stats={data.stats}
      />
    );
  }
}
