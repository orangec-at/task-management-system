"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TaskNameDropdown } from "./TaskNameDropdown";

interface TaskListHeaderProps {
  searchTerm: string;
  searchField: string;
  onSearchChange: (value: string) => void;
  onSearchFieldChange: (value: string) => void;
  onCreateTaskClick: () => void;
  createButtonEnabled: boolean;
  createButtonDisabled: boolean;
}

export function TaskListHeader({
  searchTerm,
  searchField,
  onSearchChange,
  onSearchFieldChange,
  onCreateTaskClick,
  createButtonEnabled,
  createButtonDisabled,
}: TaskListHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <TaskNameDropdown value={searchField} onChange={onSearchFieldChange} />

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full md:w-[300px] pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {createButtonEnabled && (
          <>
            <Button
              variant="default"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={onCreateTaskClick}
              disabled={createButtonDisabled}
            >
              Create Task
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
