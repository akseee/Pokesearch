import { Fragment } from 'react';
import styles from './Flyout.module.css';

import { useDispatch } from '../../../app/store';
import { useSelector } from 'react-redux';
import { downloadCSV } from '../model/downloadCSV';
import { pokemonsActions, pokemonsSelectors } from '../../../entities/pokemon';

export const Flyout = () => {
  const dispatch = useDispatch();

  const count = useSelector(pokemonsSelectors.getSelectedCount);
  const selectedPokemons = useSelector(
    pokemonsSelectors.getSelectedPokemonsData
  );

  const onUnselectAll = () => {
    dispatch(pokemonsActions.clearPokemons());
  };

  const onDownloadClick = () => {
    downloadCSV(selectedPokemons);
    dispatch(pokemonsActions.clearPokemons());
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
        </div>
      )}
    </Fragment>
  );
};
