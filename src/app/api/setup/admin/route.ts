import {
  getHasSetup,
  setupAdminUser,
} from "@server/service/auth/setup.service";
import type { SetUpAdminUserResponse } from "@shared/contract/auth/contract";
import { SetUpAdminUserSchema } from "@shared/schema/set-up-admin-user.schema";
import { tryCatch } from "@shared/try-catch";
import { APIError as BetterAuthAPIError } from "better-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const hasSetup = await getHasSetup();
  if (hasSetup) {
    return NextResponse.json(
      { error: "이미 설정되었습니다." },
      { status: 409 },
    );
  }

  const body = await request.json();
  const { success, data, error } =
    await SetUpAdminUserSchema.safeParseAsync(body);
  if (!success) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { email, password, name } = data;

  const { data: setupResult, error: setupError } = await tryCatch(() => {
    return setupAdminUser({ email, password, name });
  });

  if (setupResult) {
    return NextResponse.json({ ok: true } satisfies SetUpAdminUserResponse, {
      status: 200,
    });
  }

  if (setupError instanceof BetterAuthAPIError) {
    if (setupError.statusCode === 422) {
      return NextResponse.json(
        { error: "이미 사용중인 이메일입니다." },
        { status: 422 },
      );
    }

    return NextResponse.json(
      { error: setupError.body?.error || setupError.status },
      { status: setupError.statusCode },
    );
  }

  return NextResponse.json(
    { error: "알 수 없는 오류가 발생했습니다." },
    { status: 500 },
  );
}
