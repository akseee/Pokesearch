import { Component, type ChangeEvent, type FormEvent } from 'react';
import type { SearchFormProps } from '../model/types';

export class SearchForm extends Component<SearchFormProps> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.props.onChange(value);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch();
  };

  render() {
    const {
      value,
      inputPlaceholder,
      buttonText = 'Search',
      className,
    } = this.props;

    return (
      <form className={className} onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={this.handleInputChange}
          placeholder={inputPlaceholder || 'Search.…'}
        />
        <button type="submit">{buttonText}</button>
      </form>
    );
  }
}
