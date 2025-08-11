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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <main className={styles.main}>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
