import { cva } from "class-variance-authority";
import type { TaskPriority } from "../types";
export default function TaskPriorityDisplay({
  priority,
}: {
  priority: TaskPriority;
}) {
  const priorityClass = cva("px-2 py-1 rounded", {
    variants: {
      priority: {
        Low: "text-green-500",
        Medium: "text-yellow-500",
        High: "text-red-500",
        default: "text-gray-500",
      },
    },
    defaultVariants: {
      priority: "default",
    },
  });
  return <span className={priorityClass({ priority })}>{priority}</span>;
}
