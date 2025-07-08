import { Component, type ChangeEvent } from 'react';
import type { SearchFormProps } from '../model/types';

export class SearchForm extends Component<SearchFormProps> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.props.onChange(value);
  };

  handleButtonClick = () => {
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
      <div className={className}>
        <input
          type="text"
          value={value}
          onChange={this.handleInputChange}
          placeholder={inputPlaceholder || 'Search.…'}
        />
        <button onClick={this.handleButtonClick}>{buttonText}</button>
      </div>
    );
  }
}
