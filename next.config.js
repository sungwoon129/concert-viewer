/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://www.kopis.or.kr/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
