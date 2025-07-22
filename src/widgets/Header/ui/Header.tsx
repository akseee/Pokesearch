import { useNavigate } from 'react-router';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const handleListClick = () => {
    console.log('yet to configure');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles.title}>PokéDexplorer</h1>
        <p className={styles.text}>Explore the Pokémon universe</p>
      </div>
      <div className={styles['button-wrapper']}>
        <button className={styles.list} onClick={handleListClick}>
          List
        </button>
        <button className={styles.about} onClick={() => navigate('/about')}>
          About
        </button>
      </div>
    </div>
  );
};
