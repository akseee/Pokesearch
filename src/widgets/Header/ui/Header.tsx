import { Link, useLocation, useNavigate } from 'react-router';
import styles from './Header.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../../shared/config/context/context';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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
        {location.pathname !== '/' && (
          <button className={styles.list} onClick={handleMainClick}>
            Main
          </button>
        )}
        <button className={styles.about} onClick={() => navigate('/about')}>
          About
        </button>
        <button onClick={toggleTheme}>theme</button>
      </div>
    </div>
  );
};
