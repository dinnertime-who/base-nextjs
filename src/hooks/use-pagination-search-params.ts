"use client";

import {
  parseAsInteger,
  type UseQueryStatesOptions,
  useQueryStates,
} from "nuqs";

const paginationSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
};

export function usePaginationSearchParams(
  options?: UseQueryStatesOptions<typeof paginationSearchParams>,
) {
  return useQueryStates(paginationSearchParams, options);
}
