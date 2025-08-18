import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <section className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>This page doesnt exist</h2>
            <Link className={styles.link} href="/">
              Go back to the main page
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
