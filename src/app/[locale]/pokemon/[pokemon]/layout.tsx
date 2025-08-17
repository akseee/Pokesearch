import { ReactNode } from 'react';
import { MainPage } from '../../../MainPage';

const DetailedLayout = ({ children }: { children: ReactNode }) => {
  return <MainPage>{children}</MainPage>;
};
export default DetailedLayout;
