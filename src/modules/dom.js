import ProjectManager from "./projectManager.js";

const projectsList = document.getElementById("projects-list");
const todosList = document.getElementById("todos-list");

export const renderProjects = () => {
  projectsList.innerHTML = "";
  ProjectManager.projects.forEach((proj, index) => {
    const li = document.createElement("li");
    li.textContent = proj.name;

    if (ProjectManager.curProject === proj) {
      li.style.fontWeight = "bold";
    }

    li.addEventListener("click", () => {
      ProjectManager.switchProject(index);
      renderProjects();
      renderTodos();
    });

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
