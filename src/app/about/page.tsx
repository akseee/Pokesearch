import { Metadata } from 'next';
import { AboutPage } from '../../pages/AboutPage';

export const metadata: Metadata = {
  title: 'PokéDexplorer. About',
  description: 'This application was created by @akseee',
};

const About = () => <AboutPage />;
export default About;
