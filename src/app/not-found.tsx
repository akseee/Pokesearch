import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>This page doesnt exist</h2>
        {/* <Link to="/" className={styles.link}>
          Go back to the main page
        </Link> */}
      </div>
    </div>
  );
};
export default NotFound;
