import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import type { PortfolioItem } from "@/lib/portfolio"

interface PortfolioCardProps {
  item: PortfolioItem
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {item.demoUrl && (
          <Button size="sm" variant="default" asChild>
            <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              데모
            </a>
          </Button>
        )}
        {item.githubUrl && (
          <Button size="sm" variant="outline" asChild>
            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-1" />
              코드
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
