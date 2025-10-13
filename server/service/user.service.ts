import "server-only";

import { db } from "@server/db";
import { user } from "@server/db/schema";
import { count, desc, ilike, or, sql } from "drizzle-orm";
import type { UserListFilters, UserListResponse } from "@/types/user";

export const getUserList = async (
  filters: UserListFilters = {},
): Promise<UserListResponse> => {
  const {
    search,
    role,
    emailVerified,
    banned,
    page = 1,
    pageSize = 10,
  } = filters;

  const conditions = [];

  // 검색 조건 (이름 또는 이메일)
  if (search) {
    conditions.push(
      or(ilike(user.name, `%${search}%`), ilike(user.email, `%${search}%`)),
    );
  }

  // 역할 필터
  if (role) {
    conditions.push(sql`${user.role} = ${role}`);
  }

  // 이메일 인증 필터
  if (emailVerified !== undefined) {
    conditions.push(sql`${user.emailVerified} = ${emailVerified === "true"}`);
  }

  // 차단 상태 필터
  if (banned !== undefined) {
    conditions.push(sql`${user.banned} = ${banned === "true"}`);
  }

  // 전체 개수 조회
  const [totalResult] = await db
    .select({ count: count() })
    .from(user)
    .where(
      conditions.length > 0
        ? sql`${sql.join(conditions, sql` AND `)}`
        : undefined,
    );

  const total = totalResult?.count ?? 0;
  const totalPages = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;

  // 사용자 목록 조회
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
      banned: user.banned,
      banReason: user.banReason,
      banExpires: user.banExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: sql<Date | null>`NULL`.as("lastLoginAt"),
    })
    .from(user)
    .where(
      conditions.length > 0
        ? sql`${sql.join(conditions, sql` AND `)}`
        : undefined,
    )
    .orderBy(desc(user.createdAt))
    .limit(pageSize)
    .offset(offset);

  return {
    users,
    total,
    page,
    pageSize,
    totalPages,
  };
};
