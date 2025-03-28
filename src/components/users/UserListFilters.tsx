"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface UserListFiltersProps {
  selectedRoles: string[];
  availableRoles: string[]; // 응답 값 내에 존재하는 권한으로만 구성
  onToggleRole: (role: string) => void;
  isDisabled: boolean; // 뷰어는 필터 변경 불가
}

export function UserListFilters({
  selectedRoles,
  availableRoles,
  onToggleRole,
  isDisabled,
}: UserListFiltersProps) {
  return (
    <div className="border-t border-b py-3 mb-4">
      <div className="flex flex-wrap items-center gap-6">
        <span className="font-medium">사용자 권한</span>

        <div className="flex flex-wrap items-center gap-8">
          {availableRoles.map((role) => {
            // 화면에 표시될 레이블 설정
            let label = role;
            if (role === "PrimeUser") label = "Prime User";
            if (role === "RegularUser") label = "Regular User";

            return (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role}`}
                  checked={selectedRoles.includes(role)}
                  onCheckedChange={() => onToggleRole(role)}
                  disabled={isDisabled}
                  className={isDisabled ? "cursor-not-allowed opacity-50" : ""}
                />
                <label
                  htmlFor={`role-${role}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    isDisabled ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
