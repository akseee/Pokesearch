import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './SearchForm.module.css';

export const SearchForm = ({
  query = '',
  onSubmit,
}: {
  query?: string;
  onSubmit: (query: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery('');
    onSubmit('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search…"
      />
      <button type="submit">Find!</button>
      <button onClick={handleClear} className={styles.clear}>
        Clear
      </button>
    </form>
  );
};
