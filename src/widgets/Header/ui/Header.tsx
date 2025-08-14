'use client';
import styles from './Header.module.css';
import { ThemeButton } from '../../../features/ThemeButton';
import {
  Link,
  usePathname,
  useRouter,
} from '../../../shared/config/i18n/navigation';
import { LanguageButton } from '../../../features/LanguageButton';
import { useTranslations } from 'next-intl';

export const Header = () => {
  const t = useTranslations('header');
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
        <p className={styles.text}>{t('description')}</p>
      </div>
      <div className={styles['button-wrapper']}>
        {pathname !== '/' && (
          <button className={styles.list} onClick={handleMainClick}>
            {t('nav.main')}
          </button>
        )}
        <button className={styles.about} onClick={handlAboutClick}>
          {t('nav.about')}
        </button>
        <ThemeButton />
        <LanguageButton />
      </div>
    </header>
  );
};
