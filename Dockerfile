# 의존성 설치 단계
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 빌드 단계
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 환경 변수 설정
ENV NEXT_TELEMETRY_DISABLED=1

# Next.js 빌드 (Turbopack 없이 - 프로덕션 빌드용)
RUN pnpm build

# 프로덕션 실행 단계
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 비 root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Next.js 빌드 결과 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

