import { useTranslations } from 'next-intl';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const t = useTranslations('about');
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}></div>
      <div className={styles.article}>
        <article className={styles['article-content']}>
          <p className={styles.text}>{t('text1')}</p>
          <p className={styles.text}>{t('text2')}</p>
          <p className={(styles.text, styles.special)}>{t('text_thanks')}</p>

          <div className={styles.links}>
            <p>
              {t('task_provided')}{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                RS School
              </a>
            </p>
            <p>
              {t('github')}{' '}
              <a
                href="https://github.com/akseee"
                target="_blank"
                rel="noopener noreferrer"
              >
                @akseee
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
export default AboutPage;
