"use client";

import { Badge } from "@/components/ui/badge";

interface TaskCountBadgeProps {
  totalCount: number;
}

export function TaskCountBadge({ totalCount }: TaskCountBadgeProps) {
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
