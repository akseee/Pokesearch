'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../../shared/config/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export const LanguageButton = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const pageParam = searchParams?.get('page');
  const queryParam = searchParams?.get('query');

  const switchLocale = (): void => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    router.replace(
      {
        pathname,
        query: {
          ...(pageParam ? { page: pageParam } : {}),
          ...(queryParam ? { query: queryParam } : {}),
        },
      },
      { locale: nextLocale }
    );
  };

  return (
    <button onClick={switchLocale}>
      {locale === 'en' ? 'en → ru' : 'ru → en'}
    </button>
  );
};
