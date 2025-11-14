"use client";
import TaskListItem from "./task-item";
import type { Task } from "../types";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onEdit?: (task?: Task | null) => void;
  onDelete?: (id: number) => void;
}) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 p-4">
      {tasks.length === 0 ? (
        <p className="col-span-4 text-gray-500 dark:text-gray-400">
          No tasks available.
        </p>
      ) : (
        TaskListItem(tasks, onEdit, onDelete)
      )}
    </div>
  );
}
