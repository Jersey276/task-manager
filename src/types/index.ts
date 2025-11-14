export type Task = {
  id: number;
  name: string;
  category: TaskCategory;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
};
export type TaskCategory = "Work" | "Personal" | "Urgent" | "Others";
export type TaskStatus = "Not Started" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
