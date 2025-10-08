import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  organizationClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "@server/auth";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    organizationClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});
