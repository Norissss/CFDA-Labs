import { useEffect, useState } from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("react-tasks");

      return savedTasks
        ? JSON.parse(savedTasks)
        : [
            {
              id: 1,
              name: "Belajar component React",
              completed: true,
            },
            {
              id: 2,
              name: "Belajar props React",
              completed: false,
            },
            {
              id: 3,
              name: "Belajar useState dan useEffect",
              completed: false,
            },
          ];
    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      return [];
    }
  });

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem("react-tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
    }
  }, [tasks]);

  useEffect(() => {
    const previousTitle = document.title;

    document.title = `${completedTasks}/${tasks.length} tugas selesai`;

    // Cleanup function
    return () => {
      document.title = previousTitle;
    };
  }, [completedTasks, tasks.length]);

  function addTask(taskName) {
    const newTask = {
      id: crypto.randomUUID(),
      name: taskName,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function toggleTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <main className="app-container">
      <section className="task-card">
        <Header
          totalTasks={tasks.length}
          completedTasks={completedTasks}
        />

        <TaskForm onAddTask={addTask} />

        <TaskFilter
          currentFilter={filter}
          onChangeFilter={setFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </section>
    </main>
  );
}

export default App;