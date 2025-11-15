import "./styles.css";
import Project from "./project.js";
import ToDo from "./todo.js";
import ProjectManager from "./projectManager.js";

const project = Project("Random Project");
const todo = ToDo("name", "desc", "09/16/26", "high");
console.log("All projects:", ProjectManager.projects);
