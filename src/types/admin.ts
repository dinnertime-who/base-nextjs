import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type React from "react";

export type AdminMenuItem = {
  id: string;
  title: string;
  href: React.ComponentProps<typeof Link>["href"];
  icon: LucideIcon;
  items?: AdminMenuSubItem[];
};

export type AdminMenuSubItem = {
  id: string;
  title: string;
  href: React.ComponentProps<typeof Link>["href"];
};

export type AdminMenuGroup = {
  id: string;
  label?: string;
  items: AdminMenuItem[];
};
