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

type DeviceType =
  | "mobile"
  | "tablet"
  | "console"
  | "smarttv"
  | "wearable"
  | "embedded"
  | "desktop";

export const getDeviceType = async (request?: { headers: Headers }) => {
  // device.type은 'mobile', 'tablet', 'console', 'smarttv',
  // 'wearable', 'embedded' 또는 정의되지 않음(데스크톱 브라우저의 경우)일 수 있습니다.
  const { device } = await getUserAgent(request);
  return (device.type || "desktop") as DeviceType;
};
