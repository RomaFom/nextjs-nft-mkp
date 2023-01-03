/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    // experimental: {
    //     appDir: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: 'roma-mkp.infura-ipfs.io',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
