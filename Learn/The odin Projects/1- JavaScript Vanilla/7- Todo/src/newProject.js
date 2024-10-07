import {
  remove_All_Selected,
  show_project_tasks,
  handle_project_click_bg,
} from "./ui_controler"; 
import { state } from "./state.js";

export class Project{
    constructor(name) {
        this.projectName = name;
        this.todos = [];        
    }
}



export function CreatProjectElement(project) {
    let Container = document.querySelector(".menu_container");
    let newProject = document.createElement("div")
    newProject.classList.add("Project_item");
    newProject.classList.add("flex_center");
    // newProject.classList.add("menu_btn");

    let newProject_text = document.createElement("div");
    newProject_text.classList.add("Project_item_text");
    let newProject_menu = document.createElement("div");
    newProject_menu.classList.add("Project_item_menu");

    let newProject_menu_span = document.createElement("span");
    newProject_menu_span.textContent = "more_vert";
    newProject_menu_span.classList.add("material-symbols-outlined");
    newProject_text.textContent = project.projectName;

    newProject_menu.appendChild(newProject_menu_span);
    newProject.appendChild(newProject_text);
    newProject.appendChild(newProject_menu);

    let add_new_project_btn = document.querySelector(".add_project ");
    Container.insertBefore(newProject, add_new_project_btn);



    newProject.addEventListener("click", () => {
        remove_All_Selected();
        handle_project_click_bg(newProject);
        state.selected_project_obj = project;
        show_project_tasks(state.selected_project_obj);
    });
}