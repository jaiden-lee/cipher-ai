/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/pythonapi',
        destination: process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:5328/api/pythonapi*'
        : '/api/',
      },
    ]
  }
};

export default nextConfig;
