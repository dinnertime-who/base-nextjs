"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminMenuConfig } from "@/config/admin-menu";
import { AdminSidebarFooter } from "./admin-sidebar-footer";
import { AdminSidebarHeader } from "./admin-sidebar-header";
import { AdminSidebarMenuItem } from "./admin-sidebar-menu-item";

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AdminSidebarHeader />
      <SidebarContent>
        {adminMenuConfig.map((group) => (
          <SidebarGroup key={group.id}>
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <AdminSidebarMenuItem key={item.id} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <AdminSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
