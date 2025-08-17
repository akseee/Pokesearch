import { ReactNode } from 'react';
import styles from './layout.module.css';

const DetailedLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.layout}>{children}</div>;
};
export default DetailedLayout;
