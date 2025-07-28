import { Fragment, useState } from 'react';
import styles from './Flyout.module.css';

export const Flyout = () => {
  const [count, setCount] = useState(1);

  const onUnselectAll = () => {
    setCount(0);
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
