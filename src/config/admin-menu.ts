import {
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import type { AdminMenuGroup } from "@/types/admin";

export const adminMenuConfig: AdminMenuGroup[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        title: "대시보드",
        href: "/admin",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    id: "content",
    label: "콘텐츠 관리",
    items: [
      {
        id: "posts",
        title: "게시글",
        href: "/admin/posts",
        icon: FileTextIcon,
        items: [
          {
            id: "posts-all",
            title: "전체 게시글",
            href: "/admin/posts",
          },
        ],
      },
      {
        id: "users",
        title: "회원 관리",
        href: "/admin/users",
        icon: UsersIcon,
        items: [
          {
            id: "users-all",
            title: "전체 회원",
            href: "/admin/users",
          },
        ],
      },
    ],
  },
  {
    id: "system",
    label: "시스템",
    items: [
      {
        id: "settings",
        title: "설정",
        href: "/admin/settings",
        icon: SettingsIcon,
        items: [
          {
            id: "settings-site",
            title: "사이트 설정",
            href: "/admin/settings",
          },
        ],
      },
    ],
  },
];
