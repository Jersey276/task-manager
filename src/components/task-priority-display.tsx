import { cva } from "class-variance-authority";
import type { TaskPriority } from "../types";
export default function TaskPriorityDisplay({
  priority,
}: {
  priority: TaskPriority;
}) {
  const priorityClass = cva("px-2 py-1 border rounded-lg", {
    variants: {
      priority: {
        Low: "text-green-500 bg-green-100 border-green-200",
        Medium: "text-yellow-500 bg-yellow-100 border-yellow-200",
        High: "text-red-500 bg-red-100 border-red-200",
        default: "text-gray-500 bg-gray-100 border-gray-200w",
      },
    },
    defaultVariants: {
      priority: "default",
    },
  });
  return <span className={priorityClass({ priority })}>{priority}</span>;
}
