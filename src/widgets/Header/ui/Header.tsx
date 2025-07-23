import { Link, useNavigate } from 'react-router';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();

  const handleMainClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles.title}>
          <Link to={'/'}>PokéDexplorer</Link>
        </h1>
        <p className={styles.text}>Explore the Pokémon universe</p>
      </div>
      <div className={styles['button-wrapper']}>
        <button className={styles.list} onClick={handleMainClick}>
          Main
        </button>
        <button className={styles.about} onClick={() => navigate('/about')}>
          About
        </button>
      </div>
    </div>
  );
};
