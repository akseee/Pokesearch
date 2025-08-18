import styles from './layout.module.css';
import { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '../../shared/config/i18n/routing.ts';
import { Header } from '../../widgets/Header/index.ts';
import { Flyout } from '../../widgets/Flyout/ui/Flyout.tsx';
import { AppProvider } from '../../shared/config/providers/AppProvider.tsx';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'PokéDexplorer',
  description:
    'This is an application where you can find data about pokemon of your interest!',
  icons: { icon: '/favicon.svg' },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <AppProvider>
            <main className={styles.main}>
              <Header />
              {children}
              <Flyout />
            </main>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
