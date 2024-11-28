/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // 임시로 모든 도메인에서 오는 이미지 허용 (이미지 저장 로직 구현 후 수정 필요)
  images: {
    // remotePatterns: [{ protocol: "https", hostname: "**" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default bundleAnalyzer(nextConfig);
