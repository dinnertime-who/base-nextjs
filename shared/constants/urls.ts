import z from "zod";

export const APP_BASE_URL = z
  .string()
  .parse(process.env.NEXT_PUBLIC_BASE_URL || "");
export const API_URL = `${APP_BASE_URL}/api`;
