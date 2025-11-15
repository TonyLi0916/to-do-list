import Project from "./modules/project.js";
import Todo from "./modules/todo.js";

const ProjectManager = (() => {
    const projects = [];
    const curProject = null;

    // load from localstorage
    const loadProjects = () => {
        const data = localStorage.getItem("projects");
        if (!data) return [];
        const parse = JSON.parse(data);

        return parse.map(proj => {
            const newProj = Project(proj.name);
            newProj.todos(...proj.todos);
            return newProj;
        });
    };

    // save to localstorage 
    const saveProject = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

});