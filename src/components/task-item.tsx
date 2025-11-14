import { PencilIcon, TrashIcon } from "lucide-react";
import TaskPriorityDisplay from "./task-priority-display";
import DateDiff from "./date-diff";

export default function TaskListItem(
  items: any[],
  onEdit?: (task?: any) => void,
  onDelete?: (id: number) => void
) {
  function deleteTask(id: number) {
    onDelete?.(id);
  }
  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col border border-boston-blue-400 bg-boston-blue-100 rounded-lg shadow-md"
        >
          <div className="flex flex-row justify-between px-2">
            <div className="flex flex-row gap-2">
              <h3 className="grow text-lg font-semibold capitalize">
                {item.name}
              </h3>
              <span className=" text-boston-blue-600">
                {item.category ?? "null"}
              </span>
            </div>
            <div className="flex flex-row gap-1 my-auto">
              <PencilIcon
                onClick={() => onEdit?.(item)}
                className="h-4 cursor-pointer"
              />
              <TrashIcon
                onClick={() => deleteTask(item.id)}
                className="h-4 cursor-pointer"
              />
            </div>
          </div>
          <div className="px-2 py-1 text-boston-blue-600 border-y">
            <p className="text-left">{item.description}</p>
          </div>
          <div className="flex flex-row justify-between px-2 py-1">
            <span className="px-2 py-1">{item.status}</span>
            <span className="px-2 py-1">
              {item.expiresAt && DateDiff(new Date(item.expiresAt))}
            </span>
            <TaskPriorityDisplay priority={item.priority} />
          </div>
        </div>
      ))}
    </>
  );
}
