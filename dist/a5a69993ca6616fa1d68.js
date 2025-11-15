import "./styles.css";
import ProjectManager from "./modules/projectManager.js";
import { renderProjects, renderTodos } from "./modules/dom.js";

// initialize
ProjectManager.init();
renderProjects();
renderTodos();

// add project
document.getElementById("add-project-btn").addEventListener("click", () => {
  const name = document.getElementById("new-project-name").value;
  if (!name) return;
  ProjectManager.createProject(name);
  renderProjects();
  renderTodos();
  document.getElementById("new-project-name").value = "";
});

// add todo
document.getElementById("add-todo-btn").addEventListener("click", () => {
  const title = document.getElementById("todo-title").value;
  const desc = document.getElementById("todo-desc").value;
  const due = document.getElementById("todo-due").value;
  const priority = document.getElementById("todo-priority").value;

  if (!title || !due) return;

  ProjectManager.addTodo(title, desc, due, priority);
  renderTodos();

  // clear inputs
  document.getElementById("todo-title").value = "";
  document.getElementById("todo-desc").value = "";
  document.getElementById("todo-due").value = "";
});
