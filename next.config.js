/** @type {import('next').NextConfig} */

const awsCdnDomain = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN?.replace('https://','');

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: awsCdnDomain,
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
