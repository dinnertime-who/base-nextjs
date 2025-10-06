# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 지침

**이 프로젝트에서는 모든 응답을 한글로 작성합니다.**

## 프로젝트 개요

Next.js 15 애플리케이션으로 Turbopack, React 19, TypeScript, Tailwind CSS 4를 사용합니다. 인증은 Better Auth, 데이터베이스는 Drizzle ORM과 PostgreSQL, 린팅/포맷팅은 Biome, 리치 텍스트 에디터는 Tiptap을 사용합니다.

## 명령어

**개발:**
- `pnpm dev` - Turbopack으로 개발 서버 시작
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 시작
- `pnpm lint` - Biome 린팅 검사 실행
- `pnpm format` - Biome으로 코드 포맷팅

**데이터베이스:**
- `pnpm db:push` - 스키마 변경사항을 데이터베이스에 푸시
- `pnpm db:generate` - 마이그레이션 파일 생성
- `pnpm db:migrate` - 마이그레이션 실행
- `pnpm db:studio` - Drizzle Studio 열기

**Docker:**
- `pnpm docker:build` - Docker 이미지 빌드
- `pnpm docker:up` - 컨테이너 시작
- `pnpm docker:down` - 컨테이너 중지
- `pnpm docker:logs` - 애플리케이션 로그 보기

## 아키텍처

### 경로 별칭

- `@/*` - `src/*`로 매핑
- `@server/*` - `server/*`로 매핑 (서버 전용 코드)
- `@tiptap-editor/*` - `src/components/tiptap/*`로 매핑
- `@constants/*` - `src/constants/*`로 매핑

### 디렉토리 구조

**서버 사이드 (`server/`):**
- `server/auth.ts` - Better Auth 설정 (이메일/비밀번호, OAuth (Google, Naver, Kakao), OTP, 관리자, 조직, JWT 플러그인)
- `server/db/` - Drizzle ORM 설정 및 데이터베이스 연결
- `server/db/schema/` - 데이터베이스 스키마 정의 (인증 테이블, 사이트 설정)
- `server/service/` - 서버 사이드 비즈니스 로직 및 데이터 접근 계층
- `server/lib/` - 서버 전용 유틸리티 함수

**클라이언트 사이드 (`src/`):**
- `src/app/` - Next.js App Router 페이지 및 API 라우트
- `src/app/(platform)/` - 플랫폼 페이지를 위한 라우트 그룹 (로그인, 회원가입)
- `src/app/admin/` - 중첩 라우트 그룹이 있는 관리자 페이지
- `src/app/api/auth/[...all]/` - Better Auth 캐치올 라우트 핸들러
- `src/components/ui/` - Radix UI 기반 shadcn/ui 컴포넌트
- `src/components/tiptap/` - Tiptap 리치 텍스트 에디터 컴포넌트 및 아이콘
- `src/hooks/` - 커스텀 React 훅 (Tiptap 관련, 반응형 유틸리티)
- `src/lib/` - 클라이언트 사이드 유틸리티 (Tiptap 헬퍼, 인증)
- `src/middleware.ts` - 디바이스 감지를 위한 Next.js 미들웨어 (RSC 요청, API 라우트, 정적 파일 제외)

### 주요 기술

**인증:**
- Drizzle 어댑터를 사용하는 Better Auth
- 소셜 프로바이더: Google, Naver, Kakao
- bcrypt-ts 해싱을 사용하는 이메일/비밀번호
- 이메일 OTP 인증
- 플러그인을 통한 관리자 및 조직 지원
- 미들웨어는 이중 실행 방지를 위해 RSC 요청 제외

**데이터베이스:**
- PostgreSQL과 Drizzle ORM (pg 드라이버)
- 스키마 위치: `server/db/schema/index.ts`
- 인증 테이블: user, session, account, verification, organization, member, invitation, jwks
- 설정 가능한 메타데이터를 위한 사이트 설정 테이블
- `DATABASE_URL` 환경 변수를 통한 연결 문자열

**스타일링:**
- PostCSS를 사용하는 Tailwind CSS 4
- Pretendard 폰트 패밀리
- 테마를 위한 CSS 커스텀 속성 (예: `--document-scroll-pt`)
- Radix UI 프리미티브를 사용하는 shadcn/ui 컴포넌트

**에디터:**
- 다양한 확장 기능을 가진 Tiptap (하이라이트, 이미지, 리스트, 타이포그래피, 텍스트 정렬 등)
- `src/lib/tiptap-utils.ts`의 커스텀 툴바 및 포맷팅 유틸리티

**상태 관리:**
- 서버 상태를 위한 React Query (@tanstack/react-query)
- 클라이언트 상태를 위한 Zustand
- Zod 검증을 사용하는 React Hook Form

### 중요 사항

- React Compiler가 실험적으로 활성화됨
- View Transition API 활성화됨
- 빠른 빌드를 위해 TypeScript 및 ESLint 빌드 에러 무시
- 타입이 지정된 라우트 활성화됨
- Docker 배포를 위한 Standalone 출력
- 보안 헤더 설정됨 (X-Frame-Options, CSP 등)
- 사이트 메타데이터(이름, 설명, 파비콘)는 `getSiteSettings()`를 통해 데이터베이스에서 동적으로 로드됨
- `server/service/`의 모든 데이터베이스 작업은 "server-only" import 가드 사용
- Biome이 Next.js 및 React 도메인 규칙과 함께 린팅 및 포맷팅 처리

## 환경 변수

프로젝트 루트에 `.env` 파일을 생성하세요. `.env.example` 파일을 참고하여 필요한 값을 설정하세요.

**필수 환경 변수:**
- `DATABASE_URL` - PostgreSQL 연결 문자열
- `BETTER_AUTH_SECRET` - Better Auth 암호화 키 (랜덤 문자열)
- `BETTER_AUTH_URL` - 애플리케이션 URL (개발: http://localhost:3000)

**OAuth 소셜 로그인 (선택):**
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` - Google OAuth 자격증명
- `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET` - Naver OAuth 자격증명
- `KAKAO_CLIENT_ID`, `KAKAO_CLIENT_SECRET` - Kakao OAuth 자격증명
