"use client";
import "./App.css";
import { useEffect, useState } from "react";
import TaskList from "./components/task-list";
import TaskModal from "./components/task-modal";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? (JSON.parse(stored) as Task[]) : [];
    } catch {
      return [];
    }
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  function handleCreate(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function handleUpdate(task: Task) {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }

  function handleDelete(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="">
      <div className="">
        <TaskModal onCreate={handleCreate} onUpdate={handleUpdate} />
      </div>
      <TaskList tasks={tasks} onEdit={(task) => {
        // open modal in edit mode by setting a global state — simplest approach is to
        // reuse TaskModal's New button for now, but the pencil will trigger App-level editing
        // We can open modal by temporarily writing to localStorage and triggering a re-open,
        // but here we keep it simple: when pencil is clicked, set a temp flag in localStorage
        // and reload the page so the modal can read it. Simpler: directly open modal isn't
        // implemented — recommend next step to expose modal open API.
        // As a pragmatic immediate behavior, populate the form by replacing localStorage
        // with the edited task and then reload tasks from storage (not ideal).
        localStorage.setItem("edit_task", JSON.stringify(task));
        // Optional: navigate or trigger UI — for now do nothing else.
      }} onDelete={handleDelete} />
    </div>
  );
}

export default App;
