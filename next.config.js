/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
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
