import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">회원 목록</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            전체 회원 목록을 관리하고 검색할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            사용자 추가
          </Button>
        </div>
      </div>
    </div>
  );
}
