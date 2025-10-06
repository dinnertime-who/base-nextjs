import "server-only";
import { headers } from "next/headers";
import { userAgent } from "next/server";

/**
 * 요청 객체에서 사용자 에이전트 추출
 * @param request - 요청 객체
 * @returns 사용자 에이전트
 */
export const getUserAgent = async (request?: { headers: Headers }) => {
  const headerList = request?.headers ?? (await headers());
  return userAgent({ headers: headerList });
};
