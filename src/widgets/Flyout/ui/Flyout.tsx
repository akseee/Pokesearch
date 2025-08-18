'use client';
import { Fragment, useState, useRef } from 'react';
import styles from './Flyout.module.css';

import { useSelector } from 'react-redux';
import { pokemonsActions, pokemonsSelectors } from '../../../entities/pokemon';
import { useDispatch } from '../../../shared/config/store/store';

export const Flyout = () => {
  const dispatch = useDispatch();

  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const count = useSelector(pokemonsSelectors.getSelectedCount);
  const selectedPokemons = useSelector(
    pokemonsSelectors.getSelectedPokemonsData
  );

  const onUnselectAll = () => {
    dispatch(pokemonsActions.clearPokemons());
  };

  const onDownloadClick = async () => {
    if (selectedPokemons.length === 0) return;

    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPokemons),
      });

      if (!res.ok) {
        throw new Error(`export failed: ${res.status} ${res.statusText}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setCsvUrl(url);

      setTimeout(() => {
        if (downloadRef.current) {
          downloadRef.current.click();

          URL.revokeObjectURL(url);
          setCsvUrl(null);
        }
        dispatch(pokemonsActions.clearPokemons());
      }, 100);
    } catch (error) {
      console.error('Error during export:', error);
    }
  };

  return (
    <Fragment>
      {count > 0 && (
        <div className={styles.flyout}>
          <span>
            {count} pokemon{count > 1 ? 's' : ''} selected
          </span>
          <button onClick={onUnselectAll}>Unselect all</button>
          <button onClick={onDownloadClick}>Download</button>
          <a
            ref={downloadRef}
            href={csvUrl ?? ''}
            className={styles.blob}
            download={`${selectedPokemons.length}_selected-pokemons.csv`}
          />
        </div>
      )}
    </Fragment>
  );
};
