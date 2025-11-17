"use client";
import "./App.css";
import { useEffect, useState } from "react";
import TaskList from "./components/task-list";
import TaskForm from "./components/task-form";
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

  // Modal control state for create/edit
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);

  function openEditor(task?: Task | null) {
    setModalTask(task ?? null);
    setModalOpen(true);
  }

  return (
    <>
      <div className="m-4 flex flex-row-reverse">
        <button onClick={() => openEditor(null)} className="btn-primary">
          New Task
        </button>
      </div>
      <TaskForm
        onCreate={(t) => {
          handleCreate(t);
          setModalOpen(false);
        }}
        onUpdate={(t) => {
          handleUpdate(t);
          setModalOpen(false);
        }}
        isOpen={modalOpen}
        initialTask={modalTask}
        onClose={() => setModalOpen(false)}
      />
      <TaskList
        tasks={tasks}
        onEdit={(task) => openEditor(task)}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
