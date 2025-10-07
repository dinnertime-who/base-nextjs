import { getDeviceType } from "@server/lib/user-agent";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEVICE_TYPE_HEADER } from "@shared/constants/header";

export async function middleware(request: NextRequest) {
  // RSC 요청 제외
  const isRscRequest = request.headers.get("RSC") === "1";
  if (isRscRequest) {
    return NextResponse.next();
  }

  // 미들웨어 로직을 여기에 작성
  const response = NextResponse.next();

  const deviceType = await getDeviceType(request);
  response.cookies.set(DEVICE_TYPE_HEADER, deviceType);

  return response;
}

// 사용자 페이지 요청에만 미들웨어 적용
export const config = {
  runtime: "nodejs",
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청 경로에 매칭:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico, sitemap.xml, robots.txt (메타데이터 파일)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
