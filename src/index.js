import "./styles.css";
import DOM from "./modules/dom.js";
import Project from "./modules/project.js";
import ToDo from "./modules/todo.js";
import ProjectManager from "./modules/projectManager.js";

ProjectManager.init();
ProjectManager.clearAllExceptDefault();
ProjectManager.createProject("Random Project");
ProjectManager.addTodo("Test task", "Just testing", "2026-09-16", "high");

console.log("All projects:", JSON.stringify(ProjectManager.projects, null, 2));
