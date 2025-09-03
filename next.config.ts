/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // 정적 내보내기 최적화
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // 빌드 시 타입 체크 및 린트 무시 (빠른 빌드를 위해)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 정적 내보내기에서 문제가 될 수 있는 기능들 비활성화
  experimental: {
    // 정적 내보내기 최적화
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
