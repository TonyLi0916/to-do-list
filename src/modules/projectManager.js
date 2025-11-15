import Project from "./project.js";
import ToDo from "./todo.js";

const ProjectManager = (() => {
  const projects = [];
  let curProject = null;

  // Load projects from localStorage
  const loadProjects = () => {
    const data = localStorage.getItem("projects");
    if (!data) return [];
    const parsed = JSON.parse(data);

    return parsed.map((proj) => {
      const newProj = Project(proj.name);
      newProj.todos.push(...proj.todos);
      return newProj;
    });
  };

  // Save projects to localStorage
  const saveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  // Initialize
  const init = () => {
    const savedProjects = loadProjects();
    if (savedProjects.length) {
      projects.push(...savedProjects);
      curProject = projects[0];
    } else {
      const defaultProject = Project("Default");
      projects.push(defaultProject);
      curProject = defaultProject;
      saveProjects();
    }
  };

  // Create a new project
  const createProject = (name) => {
    const newProject = Project(name);
    projects.push(newProject);
    curProject = newProject;
    saveProjects();
    return newProject;
  };

  // Add todo to current project
  const addTodo = (title, desc, due_date, priority) => {
    if (!curProject) return null;
    const todo = ToDo(title, desc, due_date, priority);
    curProject.todos.push(todo);
    saveProjects();
    return todo;
  };

  // Delete a todo by index
  const deleteTodo = (index) => {
    if (!curProject) return;
    curProject.todos.splice(index, 1);
    saveProjects();
  };

  // Switch project by index
  const switchProject = (index) => {
    curProject = projects[index];
  };

  return {
    projects,
    get curProject() {
      return curProject;
    },
    init,
    createProject,
    addTodo,
    deleteTodo,
    switchProject,
  };
})();

export default ProjectManager;
