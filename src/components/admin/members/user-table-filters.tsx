"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserSearchParams } from "@/hooks/admin/use-user-search-params";

export function UserTableFilters() {
  const {
    setUserSearchParams, //
    userSearchParams,
    reset,
  } = useUserSearchParams();

  const handleReset = () => {
    reset();
  };

  const hasActiveFilters =
    userSearchParams.search !== "" ||
    userSearchParams.role !== "all" ||
    userSearchParams.emailVerified !== "all" ||
    userSearchParams.banned !== "all";

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1">
        <Input
          placeholder="이름 또는 이메일로 검색..."
          value={userSearchParams.search}
          onChange={(e) => setUserSearchParams({ search: e.target.value })}
          className="max-w-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value={userSearchParams.role}
          onValueChange={(value) => setUserSearchParams({ role: value })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="역할" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 역할</SelectItem>
            <SelectItem value="admin">관리자</SelectItem>
            <SelectItem value="manager">매니저</SelectItem>
            <SelectItem value="user">일반 사용자</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={userSearchParams.emailVerified}
          onValueChange={(value) =>
            setUserSearchParams({
              emailVerified: value as "all" | "true" | "false",
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="이메일 인증" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="true">인증됨</SelectItem>
            <SelectItem value="false">미인증</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={userSearchParams.banned}
          onValueChange={(value) =>
            setUserSearchParams({
              banned: value as "all" | "true" | "false",
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="false">정상</SelectItem>
            <SelectItem value="true">차단됨</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={handleReset} size="sm">
            <X className="mr-2 h-4 w-4" />
            초기화
          </Button>
        )}
      </div>
    </div>
  );
}
