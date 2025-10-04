import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  adminClient,
  organizationClient,
  jwtClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [emailOTPClient(), adminClient(), organizationClient(), jwtClient()],
});
