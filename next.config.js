/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [32, 64, 96, 124, 192, 256, 320, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.kopis.or.kr",
        port: "",
        pathname: "/upload/**",
      },
      {
        protocol: "http",
        hostname: "www.culture.go.kr",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
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
        source: "/api/classic_and_festival/:path*",
        destination: "http://kopis.or.kr/openApi/restful/pblprfr/:path*",
      },
      {
        source: "/api/exhibition/list/:path*",
        destination:
          "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/:path*",
      },
      {
        source: "/api/exhibition/detail",
        destination:
          "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/d/",
      },
    ];
  },
};

module.exports = nextConfig;
