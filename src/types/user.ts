export type UserListItem = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
};

export type UserListFilters = {
  search?: string;
  role?: string;
  emailVerified?: "true" | "false" | "all";
  banned?: "true" | "false" | "all";
  page?: number;
  pageSize?: number;
};

export type UserListResponse = {
  users: UserListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
