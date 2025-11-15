import ProjectManager from "./projectManager.js";

const projectsList = document.getElementById("projects-list");
const todosList = document.getElementById("todos-list");

export const renderProjects = () => {
  projectsList.innerHTML = "";
  ProjectManager.projects.forEach((proj, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = proj.name;
    span.style.cursor = "pointer";

    if (ProjectManager.curProject === proj) {
      span.style.fontWeight = "bold";
    }

    span.addEventListener("click", () => {
      ProjectManager.switchProject(index);
      renderProjects();
      renderTodos();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      ProjectManager.deleteProject(index);
      renderProjects();
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    projectsList.appendChild(li);
  });
};

export const renderTodos = () => {
  todosList.innerHTML = "";
  const cur = ProjectManager.curProject;
  if (!cur) return;

  cur.todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = `${todo.title} - ${todo.due_date} [${todo.priority}]`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      ProjectManager.deleteTodo(index);
      renderTodos();
    });

    li.appendChild(delBtn);
    todosList.appendChild(li);
  });
};
