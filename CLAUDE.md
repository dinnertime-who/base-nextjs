# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 지침

**이 프로젝트에서는 모든 응답을 한글로 작성합니다.**

## 프로젝트 개요

Next.js 15 애플리케이션으로 Turbopack, React 19, TypeScript, Tailwind CSS 4를 사용합니다. 인증은 Better Auth, 데이터베이스는 Drizzle ORM과 PostgreSQL, 린팅/포맷팅은 Biome, 리치 텍스트 에디터는 Tiptap을 사용합니다.

## 코딩 컨벤션

**TypeScript 타입 정의:**
- 모든 타입 정의는 **`type` 키워드**만 사용하며, `interface`는 사용하지 않습니다.
- 예시:
  ```typescript
  // ✅ 올바른 방법
  type User = {
    name: string;
    email: string;
  };

  // ❌ 사용하지 않음
  interface User {
    name: string;
    email: string;
  }
  ```

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
- `@workers/*` - `workers/*`로 매핑 (BullMQ 작업 큐)
- `@tiptap-editor/*` - `src/components/tiptap/*`로 매핑
- `@shared/*` - `shared/*`로 매핑 (공유 상수 및 유틸리티)

### 디렉토리 구조

**서버 사이드 (`server/`):**
- `server/auth.ts` - Better Auth 설정 (이메일/비밀번호, OAuth (Google, Naver, Kakao), OTP, 관리자, 조직, JWT 플러그인)
- `server/db/` - Drizzle ORM 설정 및 데이터베이스 연결
- `server/db/schema/` - 데이터베이스 스키마 정의 (인증 테이블, 사이트 설정)
- `server/service/` - 서버 사이드 비즈니스 로직 및 데이터 접근 계층
- `server/prefetches/` - React Query prefetch 함수 (서버 컴포넌트용)
- `server/lib/` - 서버 전용 유틸리티 함수

**백그라운드 작업 (`workers/`):**
- `workers/config.ts` - BullMQ 공통 설정 및 글로벌 캐싱
- `workers/queues/` - Queue 인스턴스 및 Job 추가 헬퍼
- `workers/workers/` - Worker 인스턴스 및 Job 라우팅
- `workers/handlers/` - Job 비즈니스 로직 처리
- `workers/jobs/` - Job 타입 및 이름 상수
- `workers/start.ts` - Worker 시작 및 종료

**클라이언트 사이드 (`src/`):**
- `src/app/` - Next.js App Router 페이지 및 API 라우트
- `src/app/(platform)/` - 플랫폼 페이지를 위한 라우트 그룹 (로그인, 회원가입)
- `src/app/admin/` - 중첩 라우트 그룹이 있는 관리자 페이지
- `src/app/admin/(admin)/` - 관리자 메인 페이지 (대시보드, 게시글, 회원, 설정)
- `src/app/api/auth/[...all]/` - Better Auth 캐치올 라우트 핸들러
- `src/components/ui/` - Radix UI 기반 shadcn/ui 컴포넌트
- `src/components/admin/` - 관리자 전용 컴포넌트 (사이드바, 헤더)
- `src/components/tiptap/` - Tiptap 리치 텍스트 에디터 컴포넌트 및 아이콘
- `src/config/` - 애플리케이션 설정 파일 (관리자 메뉴 등)
- `src/types/` - TypeScript 타입 정의 (type 키워드 사용)
- `src/hooks/` - 커스텀 React 훅 (Tiptap 관련, 반응형 유틸리티, 인증 계약)
- `src/lib/` - 클라이언트 사이드 유틸리티 (Tiptap 헬퍼, 인증, ts-rest 클라이언트)
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
- 커스텀 애니메이션 (Collapsible 슬라이드 다운/업)

**에디터:**
- 다양한 확장 기능을 가진 Tiptap (하이라이트, 이미지, 리스트, 타이포그래피, 텍스트 정렬 등)
- `src/lib/tiptap-utils.ts`의 커스텀 툴바 및 포맷팅 유틸리티

**상태 관리:**
- 서버 상태를 위한 React Query (@tanstack/react-query)
- 클라이언트 상태를 위한 Zustand
- Zod 검증을 사용하는 React Hook Form

**백그라운드 작업:**
- BullMQ와 Redis를 사용한 비동기 작업 큐 시스템
- `workers/` 디렉토리에 구조화된 아키텍처
- 이메일 인증 만료 처리 등의 지연 작업 지원

### BullMQ 아키텍처

**디렉토리 구조:**
- `workers/config.ts` - Redis 연결 및 Queue/Worker 공통 설정
- `workers/queues/` - Queue 인스턴스 정의 및 Job 추가 헬퍼 함수
- `workers/workers/` - Worker 인스턴스 정의 및 Job 라우팅
- `workers/handlers/` - 실제 비즈니스 로직 처리 (도메인별 분리)
- `workers/jobs/` - Job 타입 및 이름 상수 정의
- `workers/start.ts` - Worker 시작 및 Graceful Shutdown 처리

**주요 개념:**

1. **글로벌 캐싱 시스템**
   ```typescript
   // workers/config.ts
   export const getQueue = (name: string) => { /* 중복 방지 */ };
   export const getWorker = (name: string, factory: () => Worker) => { /* 중복 방지 */ };
   ```
   - Queue/Worker 인스턴스를 글로벌 Map에 캐싱하여 중복 생성 방지
   - Next.js HMR 환경에서도 안전하게 동작

2. **타입 안전한 Job 정의**
   ```typescript
   // workers/jobs/user-job.type.ts
   export const USER_JOB_NAMES = {
     DELETE_UNVERIFIED_USER: "delete-unverified-user",
   } as const;

   export type DeleteUnverifiedUserJobData = {
     userId: string;
     expiresIn: number;
   };
   ```

3. **헬퍼 함수를 통한 Job 추가**
   ```typescript
   // workers/queues/user.queue.ts
   export const addDeleteUnverifiedUser = (data: DeleteUnverifiedUserJobData) =>
     userQueue.add(USER_JOB_NAMES.DELETE_UNVERIFIED_USER, data, {
       delay: data.expiresIn * 1000,
       jobId: `${USER_JOB_NAMES.DELETE_UNVERIFIED_USER}-${data.userId}`,
     });
   ```

4. **Worker에서 Job 라우팅**
   ```typescript
   // workers/workers/user.worker.ts
   switch (name) {
     case USER_JOB_NAMES.DELETE_UNVERIFIED_USER:
       return processDeleteUnverifiedUser(data as DeleteUnverifiedUserJobData);
     // 새로운 Job은 여기에 추가
   }
   ```

5. **Handler에서 비즈니스 로직 처리**
   ```typescript
   // workers/handlers/user/delete-unverified-user.ts
   export const processDeleteUnverifiedUser = async (data: DeleteUnverifiedUserJobData) => {
     // 실제 DB 작업 등 비즈니스 로직
   };
   ```

**새로운 Job 추가 방법:**
1. `workers/jobs/[domain]-job.type.ts` - Job 이름 상수 및 데이터 타입 정의
2. `workers/queues/[domain].queue.ts` - Queue 가져오기 및 헬퍼 함수 추가
3. `workers/handlers/[domain]/[job-name].ts` - 비즈니스 로직 구현
4. `workers/workers/[domain].worker.ts` - Worker의 switch문에 케이스 추가
5. `workers/start.ts` - 필요시 새 Worker 시작 함수 호출

**설정 및 모니터링:**
- `defaultJobOptions`: 3번 재시도, exponential backoff, 자동 삭제 정책
- `defaultWorkerOptions`: 동시성 5개, Rate limiting (1초에 10개)
- Worker 이벤트 핸들러: `completed`, `failed`, `error`, `stalled`
- Graceful Shutdown: SIGTERM/SIGINT 핸들러로 안전한 종료

**실행:**
- `src/instrumentation.ts`에서 `startWorkers()` 자동 호출
- `DISABLE_WORKERS=true` 환경 변수로 비활성화 가능

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
  - `noUnusedImports` 규칙 활성화
  - VSCode에서 자동으로 미사용 import 제거
- 루트 레이아웃에 `force-dynamic` 설정으로 동적 렌더링 강제
- React Query를 사용한 서버 데이터 프리페칭 및 Hydration

### 에러 처리

**에러 페이지:**
- `src/app/not-found.tsx` - 404 페이지 (존재하지 않는 페이지)
- `src/app/error.tsx` - 런타임 에러 페이지 (일반 컴포넌트 에러)
- `src/app/global-error.tsx` - 글로벌 에러 페이지 (루트 레이아웃 에러, 인라인 CSS 사용)

**에러 페이지 차이점:**
- `error.tsx`: 컴포넌트 레벨 에러를 캐치하며, 부모 레이아웃은 유지됨
- `global-error.tsx`: 루트 `layout.tsx`의 에러를 캐치하며, 자체 `<html>`, `<body>` 태그 필요. 프로덕션 빌드에서만 제대로 동작함

### 관리자 UI

**컴포넌트 구조:**
- `src/components/admin/admin-sidebar.tsx` - 메인 사이드바 컨테이너
- `src/components/admin/admin-sidebar-header.tsx` - 사이드바 헤더 (앱 이름)
- `src/components/admin/admin-sidebar-footer.tsx` - 사이드바 푸터 (사용자 정보, 로그아웃)
- `src/components/admin/admin-sidebar-menu-item.tsx` - 메뉴 아이템 (Collapsible 서브메뉴 지원)
- `src/components/admin/admin-header.tsx` - 페이지 헤더 (토글 버튼, 브레드크럼)

**메뉴 설정:**
- `src/config/admin-menu.ts` - 관리자 메뉴 구조 정의
  - 각 그룹, 아이템, 서브아이템은 고유한 `id` 필드 보유
  - 메뉴 아이템에는 title, href, icon 포함
  - 서브메뉴는 Collapsible로 구현 (슬라이드 애니메이션)

**타입 정의:**
- `src/types/admin.ts` - AdminMenuGroup, AdminMenuItem, AdminMenuSubItem

**주요 기능:**
- shadcn/ui Sidebar 컴포넌트 활용
- 반응형 디자인 (데스크톱: 아이콘 축소, 모바일: Sheet)
- 키보드 단축키 (Cmd/Ctrl + B)
- `useAuthContract` 훅으로 세션 정보 가져오기
- Collapsible 메뉴 애니메이션 (화살표 회전, 슬라이드 다운/업)
- 현재 페이지 활성화 표시

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

**BullMQ 백그라운드 작업 (선택):**
- `REDIS_HOST` - Redis 서버 호스트 (기본값: localhost)
- `REDIS_PORT` - Redis 서버 포트 (기본값: 6379)
- `DISABLE_WORKERS` - Worker 비활성화 (true로 설정시 비활성화)
