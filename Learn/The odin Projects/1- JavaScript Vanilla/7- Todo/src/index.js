import {
  changeMenuSelected,
  show_NewProject_Form,
  hide_NewProject_Form,
  show_Task_input,
  hide_Task_input,
  show_project_tasks,
} from "./ui_controler";


import { Project, CreatProjectElement } from "./newProject";
import { Task, CreateTask  } from "./newTask";
import { state } from "./state.js";

// export let selected_project_obj = {};
// export let All_projects = [];


let menu_items = document.querySelectorAll(".menu_btn");
menu_items.forEach((item) => {
  item.addEventListener("click", () => {
    changeMenuSelected(menu_items , item);
    // changeContent()
  });
});


let show_newProjectForm_btn = document.querySelector(".add_project");
let newProject_form = document.querySelector(".menu_form");
show_newProjectForm_btn.addEventListener("click", () => {
  show_NewProject_Form(newProject_form);
});

let addProjectBtn = document.querySelector(".addProjectBtn");
addProjectBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let projectName_input = document.querySelector(
    ".menu_container form input"
  ).value;
  
  let new_project = new Project(projectName_input);
  state.All_projects.push(new_project);
  CreatProjectElement(new_project);
  projectName_input = "";
  hide_NewProject_Form();

});


// working with the task form 
document.querySelector(".add_new_task ").addEventListener("click", () => {
  show_Task_input();
});
let taskform_cancel = document.querySelector(".cancel_task_form");
let taskform_add = document.querySelector(".add_task_form");

taskform_cancel.addEventListener("click", (event) => {
  event.preventDefault();
  hide_Task_input();
});


taskform_add.addEventListener("click", (event) => {
  event.preventDefault();
  let input_title = document.querySelector(".task_form #input_title").value;
  let input_descripton = document.querySelector(
    ".task_form #input_descripton"
  ).value;
  let newTask = new Task(input_title, input_descripton);
  // let selected_project = document.querySelector(".selected_project");
  
  // state.All_projects.forEach((project) => {
  //   if (project.projectName == selected_project.querySelector(".Project_item_text").textContent){
  //     state.selected_project_obj = project;
  //   }
  // })
  
  
  
  // CreateTask(state.selected_project_obj, newTask);
  if (state.selected_project_obj) {
    state.selected_project_obj.todos.push(newTask);
    show_project_tasks(state.selected_project_obj);
  }
  else
    console.log("error ");
  hide_Task_input();
});
    
