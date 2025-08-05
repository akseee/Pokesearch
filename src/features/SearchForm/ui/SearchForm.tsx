import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './SearchForm.module.css';

export const SearchForm = ({
  query = '',
  onSubmit,
  onRefresh,
}: {
  query?: string;
  onSubmit: (query: string) => void;
  onRefresh: () => void;
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
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search…"
      />
      <button type="submit">Find!</button>
      <button
        onClick={handleClear}
        className={styles.clear}
        disabled={searchQuery === ''}
      >
        Clear
      </button>
      <button onClick={onRefresh} className={styles.clear}>
        Refresh
      </button>
    </form>
  );
};
