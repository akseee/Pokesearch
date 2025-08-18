'use client';
import styles from './Loader.module.css';

interface LoaderProps {
  className?: string;
}

export const Loader = (className: LoaderProps) => {
  return (
    <div
      className={`${styles['spinner-container']} ${styles[className.toString()]}`}
    >
      <div className={styles['spinner-ring']} />
    </div>
  );
};
