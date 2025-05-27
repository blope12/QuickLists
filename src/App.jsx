import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "General", "Work", "Study", "Home", "Other"];

function CustomAlert({ message, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="alert-backdrop"
      aria-modal="true"
      role="alertdialog"
      aria-live="assertive"
      tabIndex={-1}
      onClick={onClose} // close if user clicks backdrop
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // prevent modal close on content click
        className="alert-box"
      >
        <p className="alert-message">{message}</p>
        <button onClick={onClose} className="alert-button" autoFocus>
          OK
        </button>
      </motion.div>
    </motion.div>
  );
}

function Task({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      editTask(task.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      key={task.id}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`task ${task.completed ? "done" : ""}`}
      role="listitem"
      tabIndex={0}
      aria-pressed={task.completed}
      onClick={() => !isEditing && toggleTask(task.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !isEditing) toggleTask(task.id);
        if (e.key === "Escape" && isEditing) setIsEditing(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        marginBottom: "0.4rem",
        borderRadius: 5,
        background: task.completed ? "#d4edda" : "#f8f9fa",
        cursor: isEditing ? "text" : "pointer",
      }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEditSubmit();
            }
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditText(task.text);
            }
          }}
          aria-label={`Edit task: ${task.text}`}
          style={{
            flexGrow: 1,
            marginRight: 8,
            padding: "0.3rem 0.5rem",
            borderRadius: 3,
            border: "1px solid #ccc",
          }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          title="Double click to edit"
          style={{ flexGrow: 1, userSelect: "none" }}
        >
          [{task.completed ? "✔" : "❌"}] {task.text} ({task.category})
        </span>
      )}
      <button
        aria-label={`Delete task: ${task.text}`}
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Delete this task?")) deleteTask(task.id);
        }}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
          color: "#dc3545",
          flexShrink: 0,
          marginLeft: "0.5rem",
        }}
      >
        🗑
      </button>
    </motion.div>
  );
}


function FilterButtons({ categories, filterCategory, setFilterCategory, tasks }) {
  return (
    <div className="filter-buttons">
      {categories.map((cat) => {
        const count =
          cat === "All" ? tasks.length : tasks.filter((t) => t.category === cat).length;

        return (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            aria-pressed={filterCategory === cat}
            className="filter-button"
          >
            {cat} ({count})
          </button>
        );
      })}
    </div>
  );
}


export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [filterCategory, setFilterCategory] = useState(
    () => localStorage.getItem("filterCategory") || "All"
  );
  const [search, setSearch] = useState("");

  // Custom alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filterCategory", filterCategory);
  }, [filterCategory]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const addTask = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const duplicate = tasks.some(
      (t) => t.text.toLowerCase() === trimmedText.toLowerCase() && t.category === category
    );
    if (duplicate) {
      showAlert("Task with this text and category already exists.");
      return;
    }

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: trimmedText, category, completed: false },
    ]);
    setText("");
    showAlert("Task added successfully!");

  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
        showAlert("Task deleted!");

    }
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
      showAlert("Task updated!");

  };

  const clearCompleted = () => {
    if (window.confirm("Clear all completed tasks?")) {
      setTasks((prev) => prev.filter((task) => !task.completed));
    }
      showAlert("Completed tasks cleared!");

  };

  const filteredTasks = tasks
    .filter((task) => filterCategory === "All" || task.category === filterCategory)
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="container" role="main" aria-label="Task Manager Application">
      <aside className="sidebar" aria-label="Task list and filters">
        <h2>My Tasks</h2>

        <FilterButtons
          categories={categories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          tasks={tasks}
        />

        <input
          className="search-input"
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tasks"
          style={{
            marginBottom: "1rem",
            width: "100%",
            padding: "0.5rem",
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        <div
          className="task-list"
          role="list"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          <AnimatePresence>
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontStyle: "italic", color: "#666" }}
              >
                No tasks found.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#444" }}>
          <span>Total tasks: {tasks.length}</span>{" "}
          <span style={{ marginLeft: 10 }}>Completed: {completedCount}</span>
          <button
            onClick={clearCompleted}
            style={{
              marginLeft: 10,
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              padding: "0.3rem 0.7rem",
            }}
            aria-label="Clear all completed tasks"
          >
            Clear Completed
          </button>
        </div>
      </aside>

<section className="add-task" aria-label="Add new task">
  <h3>Add Task</h3>
  <form onSubmit={addTask} className="add-task-form">
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      aria-label="Task text"
      placeholder="New task..."
      required
      className="add-task-input"
    />
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      aria-label="Select category"
      className="add-task-select"
    >
      {categories
        .filter((c) => c !== "All")
        .map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
    </select>
    <button type="submit" className="add-task-button">
      Add
    </button>
  </form>
</section>


      <AnimatePresence>
        {alertVisible && (
          <CustomAlert
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
