import type { Metadata } from 'next';
import '../shared/styles/index.ts';
import styles from './layout.module.css';
import ClientProvider from './ClientProvider';

export const metadata: Metadata = {
  title: 'PokéDexplorer',
  description:
    'This is an application where you can find data about pokemon of your interest!',
  icons: { icon: '/favicon.svg' },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className={styles.main}>
          <ClientProvider>{children} </ClientProvider>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
