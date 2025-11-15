import Project from "./project.js";
import ToDo from "./todo.js";

const ProjectManager = (() => {
  const projects = [];
  let curProject = null;

  // load from localstorage
  const loadProjects = () => {
    const data = localStorage.getItem("projects");
    if (!data) return [];
    const parse = JSON.parse(data);

    return parse.map((proj) => {
      const newProj = Project(proj.name);
      newProj.todos.push(...proj.todos);
      return newProj;
    });
  };

  // save to localstorage
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

  // create a project
  const createProject = (name) => {
    const newProject = Project(name);
    projects.push(newProject);
    curProject = newProject;
    saveProjects();
    return newProject;
  };

  // adding a todo to the current project
  const addTodo = (title, desc, due_date, priority) => {
    const newTodo = ToDo(title, desc, due_date, priority);
    curProject.todos.push(newTodo);
    saveProjects();
    return newTodo;
  };

  // deleting a todo by index
  const deleteTodo = (index) => {
    curProject.todos.splice(index, 1);
    saveProjects();
  };

  // switching a project
  const switchProject = (index) => {
    curProject = projects[index];
  };

  // clear all projects except the default project
  const clearAllExceptDefault = () => {
    if (projects.length > 0) {
      projects.splice(1);
      curProject = projects[0];
      curProject.todos = [];
      saveProjects();
    }
  };

  return {
    projects,
    curProject,
    loadProjects,
    saveProjects,
    init,
    createProject,
    addTodo,
    deleteTodo,
    switchProject,
    clearAllExceptDefault,
  };
})();

export default ProjectManager;
