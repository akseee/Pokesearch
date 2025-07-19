import { Component } from 'react';
import { ErrorButton } from '../../../features/ErrorButton';
import { ResultList } from '../../../widgets/ResultsList/ui/ResultList';
import { SearchForm } from '../../../features/SearchForm';
import { queryLocalStorage } from '../../../shared/lib/queryLocalStorage';
import { fetchPokemonsAPI } from '../../../shared/api/fetchPokemonsAPI';
import type { NamedAPIResource } from '../../../shared/types/api';
import styles from './MainPage.module.css';
import { ErrorBoundary } from '../../../shared/ui/errorBoundary/ErrorBoundary';
import { Loader } from '../../../shared/ui/Loader/Loader';

export class MainPage extends Component {
  state = {
    query: queryLocalStorage().getQuery(),
    pokemonResources: [] as NamedAPIResource[],
    isLoading: false,
  };

  componentDidMount = () => {
    this.fetchPokemons();
  };

  fetchPokemons = async () => {
    queryLocalStorage().setQuery(this.state.query);
    const trimmed = this.state.query.trim();
    this.setState({ isLoading: true });

    try {
      const data = await fetchPokemonsAPI(trimmed);
      this.setState({
        pokemonResources: data.results,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ isLoading: false, pokemonResources: [] });

      throw new Error(`${error}`);
    }
  };

  handleChange = (newValue: string) => {
    this.setState({ query: newValue });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <SearchForm
          value={this.state.query}
          onChange={this.handleChange}
          onSearch={this.fetchPokemons}
          inputPlaceholder="Find your pokemon"
          buttonText="Find"
        />
        <ErrorBoundary>
          <ResultList
            pokemons={this.state.pokemonResources}
            isLoading={this.state.isLoading}
          />
          <ErrorButton />
        </ErrorBoundary>
        {this.state.isLoading && (
          <div className={styles.loader} data-testid="loader">
            <Loader />
          </div>
        )}
      </div>
    );
  }
}
