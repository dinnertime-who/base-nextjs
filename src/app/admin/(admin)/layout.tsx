import { auth } from "@server/auth";
import { prefetchSession } from "@server/prefetches/session.prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { makeQueryClient } from "@/components/react-query/query-client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    return redirect("/admin/sign-in");
  }
  if (session.user.role !== "admin") {
    return redirect("/");
  }

  const queryClient = makeQueryClient();
  await prefetchSession(queryClient);

  return (
    <SidebarProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminSidebar />
      </HydrationBoundary>
      <SidebarInset>
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-8">
          <section className="container mx-auto">{children}</section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
