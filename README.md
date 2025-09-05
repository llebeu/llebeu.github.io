# ILLebeu's Blog

Next.js와 Supabase를 사용한 개인 블로그 프로젝트입니다.

## 주요 기능

- 📝 **동적 블로그 포스트**: Supabase를 통한 실시간 데이터 관리
- 🎨 **모던 UI**: Tailwind CSS와 shadcn/ui 컴포넌트
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- 🌙 **다크 모드**: 라이트/다크 테마 지원
- ⚡ **빠른 성능**: Next.js App Router와 서버 사이드 렌더링
- 🔐 **관리자 기능**: 포스트 작성, 편집, 삭제 기능

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Content**: Markdown 지원

## 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone <repository-url>
cd llebeu.github.io
pnpm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 설정에서 API 키 복사
3. SQL 에디터에서 `supabase-schema.sql` 파일의 내용 실행

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 블로그를 확인할 수 있습니다.

## 사용법

### 포스트 관리

- **관리자 페이지**: `/admin`에서 모든 포스트 관리
- **새 포스트 작성**: `/admin/posts/new`에서 새 포스트 작성
- **포스트 편집**: 관리자 페이지에서 편집 버튼 클릭

### 포스트 작성

1. 관리자 페이지에서 "새 포스트 작성" 버튼 클릭
2. 제목, 슬러그, 카테고리, 태그 등 기본 정보 입력
3. 마크다운 형식으로 본문 작성
4. 게시 여부 설정 후 저장

## 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── (posts)/           # 포스트 관련 페이지
│   ├── admin/             # 관리자 페이지
│   └── globals.css        # 전역 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   └── ...
├── lib/                  # 유틸리티 및 설정
│   ├── supabase.ts       # Supabase 클라이언트 설정
│   ├── posts.tsx         # 포스트 관련 함수
│   └── utils.ts          # 공통 유틸리티
└── supabase-schema.sql   # 데이터베이스 스키마
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
