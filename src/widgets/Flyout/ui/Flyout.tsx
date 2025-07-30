import { Fragment } from 'react';
import styles from './Flyout.module.css';
import {
  pokemonsActions,
  pokemonsSelectors,
} from '../../../entities/pokemon/model/pokemonsSlice';
import { useDispatch } from '../../../app/store';
import { useSelector } from 'react-redux';

export const Flyout = () => {
  const dispatch = useDispatch();

  const count = useSelector(pokemonsSelectors.getSelectedCount);

  const onUnselectAll = () => {
    dispatch(pokemonsActions.clearPokemons());
  };

  const onDownload = () => {};

  return (
    <Fragment>
      {count > 0 && (
        <div className={styles.flyout}>
          <span>
            {count} pokemon{count > 1 ? 's' : ''} selected
          </span>
          <button onClick={onUnselectAll}>Unselect all</button>
          <button onClick={onDownload}>Download</button>
        </div>
      )}
    </Fragment>
  );
};
