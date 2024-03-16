/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN.replace('https://',''),
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
