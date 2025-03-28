import { TaskListContainer } from "@/components/tasks/TaskListContainer";
import _tasks from "@/data/task_list.json";
import { Task } from "@/types/task";

const tasks = _tasks as Task[];

export default function TasksPage() {
  return <TaskListContainer initialTasks={tasks} />;
}
