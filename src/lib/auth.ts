import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  adminClient,
  organizationClient,
  jwtClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "@server/auth";

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    adminClient(),
    organizationClient(),
    jwtClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});
