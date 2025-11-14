import { useEffect, useState } from "react";
import FormInput from "./form/input";
import TextArea from "./form/textarea";
import Select from "./form/select";
import { PlusIcon, XIcon } from "lucide-react";
import type { Task } from "../types";

export default function TaskForm({
  onCreate,
  onUpdate,
  initialTask,
  isOpen: controlledOpen,
  onClose,
}: {
  onCreate: (task: Task) => void;
  onUpdate?: (task: Task) => void;
  initialTask?: Task | null;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  // Replace these arrays with your real values or build them at runtime from enums/constants.
  const statusOptions: string[] = ["New", "In Progress", "Completed"];
  const statusPriorities: string[] = ["Low", "Medium", "High"];
  const categoryOptions: string[] = ["Work", "Personal", "Urgent", "Others"];

  const [isOpen, setIsOpen] = useState(false); // internal visibility when uncontrolled
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // sync controlled open and initialTask if parent passes them
  useEffect(() => {
    if (typeof controlledOpen === "boolean") setIsOpen(controlledOpen);
  }, [controlledOpen]);

  useEffect(() => {
    setTaskToEdit(initialTask ?? null);
  }, [initialTask]);

  function submitForm(e: React.FormEvent) {
    e.preventDefault();

    const name = (e.target as any).taskName.value as string;
    const description = (e.target as any).description.value as string;
    const category = (e.target as any).category.value as any;
    const expiresAt = (e.target as any).expiresAt.value
      ? new Date((e.target as any).expiresAt.value)
      : null;
    const status = (e.target as any).status.value as any;
    const priority = (e.target as any).priority.value as any;

    const result: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      name,
      category,
      expiresAt,
      description,
      status,
      priority,
    };

    if (taskToEdit && onUpdate) onUpdate(result);
    else onCreate(result);

    setTaskToEdit(null);
    setIsOpen(false); // Close the modal after submission
    onClose?.();
  }

  return (
    <>
      {/* Only render built-in New button when modal is uncontrolled */}
      {typeof controlledOpen === "undefined" && (
        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsOpen(true);
          }}
          className="border border-linear-to-r rounded-lg p-2 bg-linear-to-r from-blue-400 via-teal-400 to-green-400"
        >
          New Task
        </button>
      )}
      {isOpen && (
        // Overlay: capture clicks to close the modal when user clicks outside
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center m-auto justify-center"
          onMouseDown={() => setIsOpen(false)}
        >
          {/* Modal content: stop propagation so clicks inside don't close the modal */}
          <div
            className="relative bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2>{taskToEdit ? "Edit Task" : "Create a new Task"}</h2>
            <XIcon
              onClick={() => {
                setTaskToEdit(null);
                setIsOpen(false);
                onClose?.();
              }}
              className="absolute top-3 right-3 cursor-pointer"
            />
            <form onSubmit={submitForm} className="grid grid-cols-2 gap-4">
              <FormInput
                label="Task Name"
                name="taskName"
                type="text"
                defaultValue={taskToEdit?.name}
              />
              <Select
                label="Category"
                name="category"
                options={categoryOptions}
                defaultSelected={taskToEdit?.category}
              />
              <div className="col-span-2">
                <TextArea
                  label="Description"
                  name="description"
                  defaultValue={taskToEdit?.description}
                ></TextArea>
              </div>
              <div>
                <Select
                  label="Status"
                  name="status"
                  options={statusOptions}
                  defaultSelected={taskToEdit?.status}
                />
              </div>
              <div>
                <Select
                  label="Priority"
                  name="priority"
                  options={statusPriorities}
                  defaultSelected={taskToEdit?.priority}
                />
              </div>
              <div>
                <FormInput
                  label="Due Date"
                  name="expiresAt"
                  type="date"
                  defaultValue={
                    taskToEdit?.expiresAt
                      ? taskToEdit.expiresAt.toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
              <div className="col-span-2">
                <button className="flex border rounded p-2" type="submit">
                  <PlusIcon /> {taskToEdit ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
