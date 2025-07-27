import { HashRouter, Route, Routes } from 'react-router';

import { APP_PATHS } from '../../shared/config/routes/paths';
import { MainPage } from '../../pages/MainPage/';
import type { JSX } from 'react';
import { AboutPage } from '../../pages/AboutPage';
import { DetailedCard } from '../../pages/DetailedCardPage';
import { Layout } from '../layout/Layout';
import { NotFound } from '../../pages/NotFound/ui/NotFound';

export const Router = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path={APP_PATHS.HOME} element={<Layout />}>
          <Route path="" element={<MainPage />}>
            <Route path={APP_PATHS.CARD} element={<DetailedCard />} />
          </Route>
          <Route path={APP_PATHS.ABOUT} element={<AboutPage />} />
          <Route path={APP_PATHS.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
