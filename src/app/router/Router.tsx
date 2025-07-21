import { HashRouter, Route, Routes } from 'react-router';

import { APP_PATHS } from '../../shared/config/routes/paths';
import { MainPage } from '../../pages/MainPage/';
import type { JSX } from 'react';
import { AboutPage } from '../../pages/AboutPage';

export const Router = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path={APP_PATHS.HOME} element={<MainPage />}>
          <Route path={APP_PATHS.CARD} element={<div>card</div>} />
        </Route>
        <Route path={APP_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={APP_PATHS.NOT_FOUND} element={<div>Not found</div>} />
      </Routes>
    </HashRouter>
  );
};
