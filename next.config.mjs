import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/master/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin(
  './src/shared/config/i18n/request.ts'
);
export default withNextIntl(nextConfig);
