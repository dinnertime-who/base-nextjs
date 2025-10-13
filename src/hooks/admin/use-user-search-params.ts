"use client";

import {
  parseAsString,
  parseAsStringEnum,
  type UseQueryStatesOptions,
  useQueryStates,
} from "nuqs";

const defaultSearchParams = {
  search: "",
  role: "all",
  emailVerified: "all",
  banned: "all",
} as const;

const searchParams = {
  search: parseAsString.withDefault(defaultSearchParams.search),
  role: parseAsString.withDefault(defaultSearchParams.role),
  emailVerified: parseAsStringEnum(["all", "true", "false"]).withDefault(
    defaultSearchParams.emailVerified,
  ),
  banned: parseAsStringEnum(["all", "true", "false"]).withDefault(
    defaultSearchParams.banned,
  ),
};

export function useUserSearchParams(
  options?: UseQueryStatesOptions<typeof searchParams>,
) {
  const [userSearchParams, setUserSearchParams] = useQueryStates(
    searchParams,
    options,
  );

  const reset = () => {
    setUserSearchParams(defaultSearchParams);
  };

  return {
    userSearchParams,
    setUserSearchParams,
    defaultSearchParams,
    reset,
  };
}
