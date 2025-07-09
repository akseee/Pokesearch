import { Component } from 'react';
import { ErrorButton } from '../../../features/ErrorButton';
import { ErrorContext } from '../../../app/errorBoundary/errorContext';
import { ErrorText } from '../../../features/ErrorText';
import { ResultList } from '../../../widgets/ResultsList/ui/ResultList';
import { SearchForm } from '../../../features/SearchForm';
import { queryLocalStorage } from '../../../shared/lib/queryLocalStorage';
import { fetchPokemonsAPI } from '../../../shared/api/searchApi';
import type { NamedAPIResource } from '../../../shared/types/api';
import styles from './MainPage.module.css';

export class MainPage extends Component {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

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
      this.setState({});
    } catch (error) {
      this.setState({ isLoading: false, pokemonResources: [] });

      throw new Error(`${error}`);
    }
  };

  handleChange = (newValue: string) => {
    this.setState({ query: newValue });
  };

  renderError() {
    const { error, resetError } = this.context;
    if (!error) return null;

    return <ErrorText error={error} resetError={resetError} />;
  }

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
        {this.renderError()}
        <ResultList
          pokemons={this.state.pokemonResources}
          isLoading={this.state.isLoading}
        />
        <ErrorButton />
      </div>
    );
  }
}
