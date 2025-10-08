import { db } from "@server/db";
import { user } from "@server/db/schema";
import { count, eq } from "drizzle-orm";
import * as bcrypt from "bcrypt-ts";
import { auth } from "@server/auth";
import { headers } from "next/headers";
import { SetUpAdminUserSchemaType } from "@shared/schema/set-up-admin-user.schema";

export async function getHasSetup() {
  const result = await db
    .select({ count: count() })
    .from(user)
    .where(eq(user.role, "admin"));

  return result[0].count > 0;
}

export async function setupAdminUser(data: SetUpAdminUserSchemaType) {
  const { email, password, name } = data;

  const result = await auth.api.signUpEmail({
    body: { email, password, name, role: "admin" },
    headers: await headers(),
  });

  await db
    .update(user)
    .set({ role: "admin", emailVerified: true })
    .where(eq(user.id, result.user.id));

  return result;
}
