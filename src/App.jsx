import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    setProgress(
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    );
  };

  useEffect(() => {
    updateProgress();
  }, [tasks]);

  const addTask = () => {
    const taskInput = document.getElementById("taskInput").value;
    const categorySelect = document.getElementById("categorySelect").value;
    const dueDateInput = document.getElementById("dueDateInput").value;
    const prioritySelect = document.getElementById("prioritySelect").value;

    if (taskInput) {
      setTasks([
        ...tasks,
        {
          task: taskInput,
          category: categorySelect,
          dueDate: dueDateInput,
          priority: prioritySelect,
          completed: false,
        },
      ]);

      document.getElementById("taskInput").value = "";
      document.getElementById("dueDateInput").value = "";
      document.getElementById("categorySelect").value = "Work";
      document.getElementById("prioritySelect").value = "High";
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTaskToEdit(index);
    const task = tasks[index];
    document.getElementById("taskInput").value = task.task;
    document.getElementById("categorySelect").value = task.category;
    document.getElementById("dueDateInput").value = task.dueDate;
    document.getElementById("prioritySelect").value = task.priority;
  };

  const saveTask = () => {
    const taskInput = document.getElementById("taskInput").value;
    const categorySelect = document.getElementById("categorySelect").value;
    const dueDateInput = document.getElementById("dueDateInput").value;
    const prioritySelect = document.getElementById("prioritySelect").value;

    if (taskToEdit !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === taskToEdit
          ? {
              ...task,
              task: taskInput,
              category: categorySelect,
              dueDate: dueDateInput,
              priority: prioritySelect,
            }
          : task
      );
      setTasks(updatedTasks);
      setTaskToEdit(null);

      document.getElementById("taskInput").value = "";
      document.getElementById("dueDateInput").value = "";
      document.getElementById("categorySelect").value = "Work";
      document.getElementById("prioritySelect").value = "High";
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Incomplete") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <div className="app">
      <header className="header">
        <h1>My Day Planner</h1>
        <nav className="head">
          <a href="#">Home</a>
          <a href="#tasks">Tasks</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button onClick={() => setDarkMode(!darkMode)} className="icon">
          {darkMode ? "Enable Light Mode" : "Enable Dark Mode"}
        </button>
      </header>

      <main className="main">
        <section className="search">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </section>

        <section className="add-task">
          <input type="text" id="taskInput" placeholder="Add a new task" />
          <select id="categorySelect">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" id="dueDateInput" />
          <select id="prioritySelect">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {taskToEdit === null ? (
            <button onClick={addTask}>Add Task</button>
          ) : (
            <button onClick={saveTask}>Save Task</button>
          )}
        </section>

        <section className="progress">
          <p>Progress: {progress}% of tasks completed</p>
        </section>

        <ul className="tasklist">
          {filteredTasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTaskCompletion(index)}>
                {task.task} - {task.category} - {task.dueDate} - {task.priority}
              </span>
              <button className="taskbtn" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="taskbtn" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <p>
          &copy; <span>{new Date().getFullYear()}</span> My Day Planner. All
          rights reserved.
        </p>
        <nav className="menu">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
        </nav>
        <p> Designed with 💙 by me.</p>
      </footer>
    </div>
  );
};

export default App;

