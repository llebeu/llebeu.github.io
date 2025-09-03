"use client"

import { useState } from "react"
import { getPortfolioByCategory } from "@/lib/portfolio"
import { PortfolioCard } from "@/components/PortfolioCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function PortfolioProtected() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // 환경변수에서 비밀번호를 가져오거나 기본값 사용
  const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD || "portfolio2024"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // 실제 환경에서는 서버에서 검증해야 합니다
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setIsAuthenticated(true)
        setError("")
      } else {
        setError("비밀번호가 올바르지 않습니다.")
      }
      setIsLoading(false)
    }, 500) // 로딩 효과를 위한 지연
  }

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">포트폴리오</h1>
            <p className="text-muted-foreground mb-8">
              이 페이지에 접근하려면 비밀번호가 필요합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "확인 중..." : "접근하기"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              비밀번호가 필요하시다면 연락해주세요.
            </p>
          </div>
        </div>
      </main>
    )
  }

  // 인증된 경우 포트폴리오 표시
  const portfolioByCategory = getPortfolioByCategory()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Showcase of my projects and work.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          비공개 페이지
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(portfolioByCategory).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
