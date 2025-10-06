import "server-only";
import { headers } from "next/headers";
import { z } from "zod";

/**
 * IP 주소 값 추출
 * @param request - 요청 객체
 * @returns IP 주소 값
 */
export async function getIp(request?: { headers: Headers }) {
  // 요청 객체가 전달되지 않은 경우 헤더 목록 추출
  const headerList = request?.headers ?? (await headers());

  const ipValue = getIpValue(headerList);
  // IP 주소 값이 유효하지 않은 경우 null 반환
  if (!ipValue || !isValidIp(ipValue)) {
    return null;
  }

  return ipValue;
}

// IP 주소 유효성 검증 (IPv4 및 IPv6) - Zod 스키마 사용
const ipv4Schema = z.ipv4();
const ipv6Schema = z.ipv6();

/**
 * IP 주소 유효성 검증
 * @param ip - IP 주소
 * @returns 유효한 경우 true, 유효하지 않은 경우 false
 */
const isValidIp = (ip: string): boolean => {
  const ipv4Result = ipv4Schema.safeParse(ip);
  const ipv6Result = ipv6Schema.safeParse(ip);

  return ipv4Result.success || ipv6Result.success;
};

// 우선순위 순으로 헤더 목록
const IP_HEADERS = [
  "cf-connecting-ip", // Cloudflare
  "true-client-ip", // Cloudflare Enterprise, Akamai
  "x-forwarded-for", // Standard proxy header (comma-separated list)
  "x-real-ip", // Nginx proxy
  "x-client-ip", // Apache, other proxies
  "x-cluster-client-ip", // Rackspace, Riverbed
  "forwarded-for", // RFC 7239
  "forwarded", // RFC 7239
  "x-forwarded", // Variations
  "x-appengine-user-ip", // Google App Engine
] as const;

/**
 * IP 주소 값 추출
 * @param headerList - 헤더 목록
 * @returns IP 주소 값
 */
function getIpValue(headerList: Headers) {
  for (const header of IP_HEADERS) {
    // x-forwarded-for는 쉼표로 구분된 IP 목록 (첫 번째가 원본 클라이언트 IP)
    if (header === "x-forwarded-for") {
      const firstIp = headerList.get(header)!.split(",")[0].trim();
      return firstIp;
    }

    const value = headerList.get(header);
    if (value) {
      return value.trim();
    }
  }
  return null;
}
