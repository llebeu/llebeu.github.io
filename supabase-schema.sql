-- 블로그 포스트 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT '일반',
  tags TEXT[] DEFAULT '{}',
  cover TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 정책 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 게시된 포스트를 읽을 수 있도록 허용
CREATE POLICY "Anyone can view published posts" ON posts
  FOR SELECT USING (published = true);

-- 인증된 사용자가 모든 포스트를 읽을 수 있도록 허용 (관리자용)
CREATE POLICY "Authenticated users can view all posts" ON posts
  FOR SELECT USING (auth.role() = 'authenticated');

-- 인증된 사용자가 포스트를 삽입할 수 있도록 허용
CREATE POLICY "Authenticated users can insert posts" ON posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 인증된 사용자가 포스트를 업데이트할 수 있도록 허용
CREATE POLICY "Authenticated users can update posts" ON posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 인증된 사용자가 포스트를 삭제할 수 있도록 허용
CREATE POLICY "Authenticated users can delete posts" ON posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- 샘플 데이터 삽입 (선택사항)
INSERT INTO posts (title, slug, content, excerpt, category, tags, published) VALUES
(
  '내 블로그에 오신 것을 환영합니다',
  'welcome-to-my-blog',
  '# 내 블로그에 오신 것을 환영합니다

안녕하세요! 제 블로그에 오신 것을 환영합니다.

## 이 블로그는

- 개발 관련 팁과 가이드
- 디자인 시스템과 UI/UX
- 최신 웹 기술 동향
- 개인적인 학습 경험

등을 공유하는 공간입니다.

## 앞으로의 계획

앞으로 다양한 주제로 유용한 내용을 작성해 나가겠습니다.

```javascript
console.log("환영합니다! 🎉");
```

많은 관심과 피드백 부탁드립니다!',
  '새로운 블로그에 오신 것을 환영합니다.',
  '일반',
  ARRAY['환영', '소개', '블로그'],
  true
) ON CONFLICT (slug) DO NOTHING;
