import { SetUpAdminUserSchema } from "@shared/schema/set-up-admin-user.schema";
import {
  initContract,
  ServerInferRequest,
  ServerInferResponseBody,
} from "@ts-rest/core";
import z from "zod";

const c = initContract();

export const authContract = c.router({
  setupAdminUser: {
    method: "POST",
    path: "/api/setup/admin",
    body: SetUpAdminUserSchema,
    responses: {
      200: z.object({
        ok: z.boolean(),
      }),
      400: z.object({
        error: z.string(),
      }),
      409: z.object({
        error: z.string(),
      }),
    },
  },
});

export type SetUpAdminUserRequest = ServerInferRequest<
  typeof authContract.setupAdminUser
>;

export type SetUpAdminUserResponse = ServerInferResponseBody<
  typeof authContract.setupAdminUser,
  200
>;
