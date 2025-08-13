import type { Metadata } from 'next';
import '../shared/styles/index.ts';
import styles from './layout.module.css';
import { Header } from '../widgets/Header/index.ts';
import { Flyout } from '../widgets/Flyout/ui/Flyout.tsx';
import { AppProvider } from '../shared/config/providers/AppProvider.tsx';

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
        <AppProvider>
          <main className={styles.main}>
            <Header />
            {children}
            <Flyout />
          </main>
        </AppProvider>
      </body>
    </html>
  );
}

export default RootLayout;
