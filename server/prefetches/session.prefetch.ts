import { auth } from "@server/auth";
import { SESSION_QUERY_KEY } from "@shared/constants/auth";
import type { QueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";

export const prefetchSession = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: [SESSION_QUERY_KEY],
    queryFn: async () => {
      const res = await auth.api.getSession({ headers: await headers() });
      return res;
    },
  });
};
