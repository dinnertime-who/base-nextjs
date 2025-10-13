import { getUserList } from "@server/service/user.service";
import { Suspense } from "react";
import { columns } from "@/components/admin/members/columns";
import { PageHeader } from "@/components/admin/members/page-header";
import { UserDataTable } from "@/components/admin/members/user-data-table";
import { UserTableFilters } from "@/components/admin/members/user-table-filters";
import type { UserListFilters } from "@/types/user";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    role?: string;
    emailVerified?: "true" | "false";
    banned?: "true" | "false";
    page?: string;
  }>;
};

export default async function MembersPage({ searchParams }: PageProps) {
  return (
    <div className="space-y-6">
      <PageHeader />

      <UserTableFilters />

      <Suspense fallback={<div>로딩 중...</div>}>
        <UserListContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function UserListContent({
  searchParams,
}: {
  searchParams: PageProps["searchParams"];
}) {
  const params = await searchParams;
  const filters: UserListFilters = {
    search: params.search,
    role: params.role === "all" ? undefined : params.role,
    emailVerified: params.emailVerified,
    banned: params.banned,
    page: params.page ? Number.parseInt(params.page, 10) : 1,
    pageSize: 10,
  };

  const { users, totalPages, page } = await getUserList(filters);

  return (
    <UserDataTable
      columns={columns}
      data={users}
      pageCount={totalPages}
      currentPage={page}
    />
  );
}
