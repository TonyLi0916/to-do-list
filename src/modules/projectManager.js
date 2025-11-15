import Project from "./project.js";
import ToDo from "./todo.js";

const ProjectManager = (() => {
  const projects = [];
  let curProject = null;

  // load projects from localStorage
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

  // save projects to localStorage
  const saveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  // initialize
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

  // create a new project
  const createProject = (name) => {
    const newProject = Project(name);
    projects.push(newProject);
    curProject = newProject;
    saveProjects();
    return newProject;
  };

  // add todo to current project
  const addTodo = (title, desc, due_date, priority) => {
    if (!curProject) return null;
    const todo = ToDo(title, desc, due_date, priority);
    curProject.todos.push(todo);
    saveProjects();
    return todo;
  };

  // delete a todo by index
  const deleteTodo = (index) => {
    if (!curProject) return;
    curProject.todos.splice(index, 1);
    saveProjects();
  };

  // switch project by index
  const switchProject = (index) => {
    curProject = projects[index];
  };

  // delete project by index
  const deleteProject = (index) => {
    if (projects.length === 1) return;
    projects.splice(index, 1);
    if (curProject === projects[index] || !projects.includes(curProject)) {
      curProject = projects[0];
    }
    saveProjects();
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
    deleteProject,
  };
})();

export default ProjectManager;
