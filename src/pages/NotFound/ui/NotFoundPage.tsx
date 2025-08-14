import { Link } from '../../../shared/config/i18n/navigation';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>This page doesnt exist</h2>
        <Link className={styles.link} href="/">
          Go back to the main page
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
