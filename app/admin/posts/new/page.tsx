"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createPost } from "@/lib/posts";
import { toast } from "sonner";

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "일반",
    tags: "",
    cover: "",
    published: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        tags: tagsArray,
        cover: formData.cover || undefined,
        published: formData.published,
      };

      const result = await createPost(postData);

      if (result) {
        toast.success("포스트가 성공적으로 생성되었습니다!");
        router.push("/admin");
      } else {
        toast.error("포스트 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("포스트 생성 중 오류:", error);
      toast.error("포스트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">새 포스트 작성</h1>
        <p className="text-muted-foreground">
          새로운 블로그 포스트를 작성하세요
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
              <CardDescription>
                포스트의 제목, 슬러그, 카테고리 등을 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="포스트 제목을 입력하세요"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">슬러그 *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="post-slug"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  URL에 사용될 고유한 식별자입니다
                </p>
              </div>

              <div>
                <Label htmlFor="category">카테고리</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  placeholder="일반"
                />
              </div>

              <div>
                <Label htmlFor="tags">태그</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="태그1, 태그2, 태그3"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  쉼표로 구분하여 입력하세요
                </p>
              </div>

              <div>
                <Label htmlFor="cover">커버 이미지 URL</Label>
                <Input
                  id="cover"
                  value={formData.cover}
                  onChange={(e) => handleInputChange("cover", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>내용</CardTitle>
              <CardDescription>
                포스트의 요약과 본문을 작성하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="excerpt">요약</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="포스트의 간단한 요약을 입력하세요"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">본문 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="마크다운 형식으로 포스트 내용을 작성하세요"
                  rows={20}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  마크다운 형식을 지원합니다
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>게시 설정</CardTitle>
              <CardDescription>포스트의 게시 상태를 설정하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    handleInputChange("published", checked)
                  }
                />
                <Label htmlFor="published">
                  {formData.published ? "게시됨" : "임시저장"}
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "저장 중..." : "포스트 저장"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
