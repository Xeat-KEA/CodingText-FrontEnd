/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  assetPrefix: "/.",
  // 임시로 모든 도메인에서 오는 이미지 허용 (이미지 저장 로직 구현 후 수정 필요)
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "172.16.211.113",
        port: "9000",
        pathname: "/**", // 모든 하위 경로 허용
      },
      // 네이버
      {
        protocol: "https",
        hostname: "*.pstatic.net",
        pathname: "/**", // 특정 경로 패턴 허용
      },
      // 카카오
      {
        protocol: "http",
        hostname: "*.kakaocdn.net",
        pathname: "/**", // 특정 경로 패턴 허용
      },
      // 구글
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**", // 특정 경로 패턴 허용
      },
    ],
  },
};

export default bundleAnalyzer(nextConfig);
