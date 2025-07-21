import { Fragment } from 'react';
import { Loader } from '../Loader/Loader';
import type { PokemonStats } from '../../types/pokemon';
import styles from './PokemonCardLayout.module.css';
import PokemonStatsList from './PokemonStatsList';

interface PokemonCardLayoutProps {
  loading?: boolean;
  order: number;
  image?: string;
  type: string;
  title: string;
  stats?: PokemonStats;
  onClick?: () => void;
}

export const PokemonCardLayout = ({
  onClick,
  loading = false,
  image,
  order,
  type,
  title,
  stats,
}: PokemonCardLayoutProps) => (
  <li
    id={title.toLowerCase()}
    className={styles['card-layout-wrapper']}
    onClick={onClick}
  >
    <Fragment>
      <div className={styles['image-container']}>
        {loading ? (
          <div className={styles.image}>
            <Loader />
          </div>
        ) : (
          <img className={styles.image} src={image} alt={title} />
        )}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.order}>
        {`#${order.toString().padStart(3, '0')}`}
      </div>
      <div className={styles.type}>{type}</div>
      <PokemonStatsList stats={stats} />
    </Fragment>
  </li>
);
