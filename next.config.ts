import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler 활성화
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },

  // powered by 비활성화
  poweredByHeader: false,

  // react strict mode 활성화
  reactStrictMode: true,

  // 타입스크립트 빌드 오류 체크
  typescript: {
    ignoreBuildErrors: false,
  },

  // eslint 빌드 오류 체크
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Docker 배포를 위한 standalone 출력
  output: "standalone",

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTING_DOMAIN ?? "**",
      },
    ],
  },

  // 타입 라우트 설정
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
