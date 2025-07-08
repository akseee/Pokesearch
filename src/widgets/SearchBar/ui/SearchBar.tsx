import { Component } from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { queryLocalStorage } from '../model/queryLocalStorage';

interface SearchBarState {
  query: string;
}

export class SearchBar extends Component<object, SearchBarState> {
  state: SearchBarState = {
    query: queryLocalStorage().getQuery(),
  };

  fetchPokemons = () => {
    const trimmed = this.state.query.trim();
    console.log('Search query:', trimmed);
  };

  handleChange = (newValue: string) => {
    queryLocalStorage().setQuery(newValue);
    this.setState({ query: newValue });
  };

  render() {
    return (
      <SearchForm
        value={this.state.query}
        onChange={this.handleChange}
        onSearch={this.fetchPokemons}
        inputPlaceholder="Find your pokemon"
        buttonText="Find"
      />
    );
  }
}
