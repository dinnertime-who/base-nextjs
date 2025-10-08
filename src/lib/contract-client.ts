import { API_URL } from "@shared/constants/urls";
import { authContract } from "@shared/contract/auth/contract";
import { initClient } from "@ts-rest/core";

export const authContractClient = initClient(authContract, {
  baseUrl: API_URL,
});
