/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/classic/:path*",
        destination: "http://kopis.or.kr/openApi/restful/pblprfr/:path*",
      },
      {
        source: "/api/festival/:path*",
        destination: "http://kopis.or.kr/openApi/restful/prffest/:path*",
      },
      {
        source: "/api/exhibition/:path*",
        destination:
          "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
