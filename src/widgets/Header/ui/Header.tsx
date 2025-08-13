'use client';
import styles from './Header.module.css';
import { ThemeButton } from '../../../features/ThemeButton';
import {
  Link,
  usePathname,
  useRouter,
} from '../../../shared/config/i18n/navigation';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleMainClick = () => {
    router.push('/');
  };

  const handlAboutClick = () => {
    router.push('/about');
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles.title}>
          <Link href="/">PokéDexplorer</Link>
        </h1>
        <p className={styles.text}>Explore the Pokémon universe</p>
      </div>
      <div className={styles['button-wrapper']}>
        {pathname !== '/' && (
          <button className={styles.list} onClick={handleMainClick}>
            Main
          </button>
        )}
        <button className={styles.about} onClick={handlAboutClick}>
          About
        </button>
        <ThemeButton />
      </div>
    </header>
  );
};
