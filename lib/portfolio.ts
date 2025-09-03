export type PortfolioItem = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  category: string
  date: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "ecommerce-platform",
    title: "E-commerce 플랫폼",
    description:
      "Next.js와 Stripe를 활용한 현대적인 온라인 쇼핑몰입니다. 반응형 디자인과 결제 시스템, 관리자 대시보드를 포함합니다.",
    image: "/modern-ecommerce-website.png",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma"],
    demoUrl: "https://demo-ecommerce.vercel.app",
    githubUrl: "https://github.com/username/ecommerce-platform",
    category: "웹 애플리케이션",
    date: "2024-01-15",
  },
  {
    id: "task-management-app",
    title: "팀 협업 도구",
    description:
      "실시간 협업이 가능한 태스크 관리 애플리케이션입니다. 드래그 앤 드롭, 실시간 알림, 팀 채팅 기능을 제공합니다.",
    image: "/task-management-dashboard.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    demoUrl: "https://taskflow-demo.vercel.app",
    githubUrl: "https://github.com/username/task-management",
    category: "웹 애플리케이션",
    date: "2023-12-10",
  },
  {
    id: "weather-app",
    title: "날씨 정보 앱",
    description: "OpenWeather API를 활용한 실시간 날씨 정보 제공 앱입니다. 위치 기반 서비스와 7일 예보를 지원합니다.",
    image: "/weather-app-interface.png",
    tags: ["React Native", "TypeScript", "OpenWeather API", "Expo"],
    demoUrl: "https://weather-app-demo.vercel.app",
    githubUrl: "https://github.com/username/weather-app",
    category: "모바일 앱",
    date: "2023-11-20",
  },
  {
    id: "portfolio-website",
    title: "포트폴리오 웹사이트",
    description: "개발자를 위한 미니멀하고 세련된 포트폴리오 웹사이트입니다. 다크모드와 애니메이션 효과를 지원합니다.",
    image: "/minimal-portfolio-website.png",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "MDX"],
    demoUrl: "https://portfolio-demo.vercel.app",
    githubUrl: "https://github.com/username/portfolio",
    category: "웹사이트",
    date: "2023-10-05",
  },
  {
    id: "blog-cms",
    title: "블로그 CMS",
    description: "헤드리스 CMS를 활용한 블로그 플랫폼입니다. 마크다운 에디터와 SEO 최적화 기능을 제공합니다.",
    image: "/blog-cms-interface.png",
    tags: ["Next.js", "Sanity", "TypeScript", "Vercel"],
    demoUrl: "https://blog-cms-demo.vercel.app",
    githubUrl: "https://github.com/username/blog-cms",
    category: "웹 애플리케이션",
    date: "2023-09-15",
  },
  {
    id: "design-system",
    title: "디자인 시스템",
    description: "재사용 가능한 UI 컴포넌트 라이브러리입니다. Storybook과 자동화된 테스트를 포함합니다.",
    image: "/design-system-components.png",
    tags: ["React", "Storybook", "Jest", "Rollup", "TypeScript"],
    demoUrl: "https://design-system-demo.vercel.app",
    githubUrl: "https://github.com/username/design-system",
    category: "라이브러리",
    date: "2023-08-20",
  },
]

export function getPortfolioByCategory(): Record<string, PortfolioItem[]> {
  return portfolioItems.reduce(
    (acc, item) => {
      const category = item.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, PortfolioItem[]>,
  )
}

export function getPortfolioById(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id)
}
