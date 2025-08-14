import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './SearchForm.module.css';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useTranslations } from 'next-intl';

export const SearchForm = ({
  query = '',
  onSubmit,
  onRefresh,
  isLoading,
}: {
  query?: string;
  onSubmit: (query: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}) => {
  const t = useTranslations('search');
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
        placeholder={t('palceholder_btn')}
      />
      <button type="submit" className={styles.submit}>
        {isLoading ? <Loader /> : t('find_btn')}
      </button>
      <button
        onClick={handleClear}
        className={styles.clear}
        disabled={searchQuery === ''}
      >
        {t('clear_btn')}
      </button>
      <button onClick={onRefresh} className={styles.clear}>
        {t('refetch_btn')}
      </button>
    </form>
  );
};
