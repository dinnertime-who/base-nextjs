import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler 활성화
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },

  // Docker 배포를 위한 standalone 출력
  output: "standalone",

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  typedRoutes: true,

  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
