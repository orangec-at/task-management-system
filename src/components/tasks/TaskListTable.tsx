"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/types/task";

interface TaskListTableProps {
  tasks: Task[];
  selectedTasks: string[];
  sortConfig: {
    key: keyof Task | null;
    direction: "ascending" | "descending" | null;
  };
  onSort: (key: keyof Task) => void;
  onToggleSelection: (taskId: string) => void;
  onToggleAll: (checked: boolean) => void;
}

export function TaskListTable({
  tasks,
  sortConfig,
  onSort,
}: TaskListTableProps) {
  // 날짜 형식 변환 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/, /g, " ");
  };

  // 정렬 화살표 렌더링
  const renderSortArrow = (key: keyof Task) => {
    if (sortConfig.key !== key) {
      return null;
    }

    return sortConfig.direction === "ascending" ? " ↑" : " ↓";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("taskName")}
            >
              Task Name {renderSortArrow("taskName")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("taskType")}
            >
              Task Type {renderSortArrow("taskType")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("createdAt")}
            >
              Created At {renderSortArrow("createdAt")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("dueDate")}
            >
              Due Date {renderSortArrow("dueDate")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("reporter")}
            >
              Reporter {renderSortArrow("reporter")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("assignee")}
            >
              담당자(Assignee) {renderSortArrow("assignee")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => onSort("status")}
            >
              상태(Status) {renderSortArrow("status")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <TableRow key={task.taskName + idx}>
                <TableCell className="font-medium">{task.taskName}</TableCell>
                <TableCell>{task.taskType}</TableCell>
                <TableCell>{formatDate(task.createdAt)}</TableCell>
                <TableCell>{formatDate(task.dueDate)}</TableCell>
                <TableCell>{task.reporter}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "Done"
                        ? "bg-green-100 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : task.status === "Delayed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
