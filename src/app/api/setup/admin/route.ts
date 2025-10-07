import {
  getHasSetup,
  setupAdminUser,
} from "@server/service/auth/setup.service";
import {
  authContract,
  SetUpAdminUserResponse,
} from "@shared/contract/auth/contract";
import { SetUpAdminUserSchema } from "@shared/schema/set-up-admin-user.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const hasSetup = await getHasSetup();
  if (hasSetup) {
    return NextResponse.json(
      { error: "이미 설정되었습니다." },
      { status: 409 }
    );
  }

  const body = await request.json();
  const { success, data, error } = await SetUpAdminUserSchema.safeParseAsync(
    body
  );
  if (!success) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { email, password, name } = data;
  await setupAdminUser({ email, password, name });

  return NextResponse.json({ ok: true } satisfies SetUpAdminUserResponse, {
    status: 200,
  });
}
