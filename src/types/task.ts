// types/task.ts
export interface Task {
  id: string;
  taskName: string;
  taskType: string; // "일반 구매" | "핵심요소" 등
  taskDescription?: string;
  createdAt: string;
  dueDate: string;
  completedAt?: string;
  reporter: string;
  description: string;
  assignee: string;
  status:
    | "Created"
    | "InProgress"
    | "In Progress"
    | "Delayed"
    | "Done"
    | string;
}
