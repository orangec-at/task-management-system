"use client";

import { Badge } from "@/components/ui/badge";

interface UserRoleBadgeProps {
  totalCount: number; // 총 사용자 수
}

export function UserRoleBadge({ totalCount }: UserRoleBadgeProps) {
  return (
    <div className="flex items-center mb-4">
      <span className="text-sm text-muted-foreground mr-2 text-teal-600">
        Selected
      </span>
      <Badge variant="outline" className="text-teal-600 border-teal-600">
        {totalCount}
      </Badge>
    </div>
  );
}
