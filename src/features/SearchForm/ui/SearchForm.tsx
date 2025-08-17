'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './SearchForm.module.css';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const SearchForm = ({ initialQuery }: { initialQuery: string }) => {
  const router = useRouter();
  const t = useTranslations('search');

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/?query=${searchQuery.trim()}&page=1`);
  };

  const handleClear = () => {
    setSearchQuery('');
    router.push(`/?query=&page=1`);
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
        {t('find_btn')}
      </button>
      <button
        onClick={handleClear}
        className={styles.clear}
        disabled={searchQuery === ''}
      >
        {t('clear_btn')}
      </button>
      <button onClick={() => router.refresh()} className={styles.clear}>
        {t('refetch_btn')}
      </button>
    </form>
  );
};
