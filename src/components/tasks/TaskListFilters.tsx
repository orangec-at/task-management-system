"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface TaskListFiltersProps {
  selectedTaskTypes: string[];
  availableTaskTypes: string[];
  onToggleTaskType: (taskType: string) => void;
  selectedStatuses: string[];
  availableStatuses: string[];
  onToggleStatus: (status: string) => void;
}

export function TaskListFilters({
  selectedTaskTypes,
  availableTaskTypes,
  onToggleTaskType,
  selectedStatuses,
  availableStatuses,
  onToggleStatus,
}: TaskListFiltersProps) {
  return (
    <div className="space-y-4 mb-4">
      {/* Task Type 필터 */}
      <div className="border-t border-b py-3">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-medium">Task Type</span>

          <div className="flex flex-wrap items-center gap-8">
            {availableTaskTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTaskTypes.includes(type)}
                  onCheckedChange={() => onToggleTaskType(type)}
                />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status 필터 */}
      <div className="border-b py-3">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-medium">상태</span>

          <div className="flex flex-wrap items-center gap-8">
            {availableStatuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={() => onToggleStatus(status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
