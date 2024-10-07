import { Project, CreatProjectElement } from "./newProject";
import { Task, CreateTask_Element } from "./newTask"; 




export function changeMenuSelected(menu_items , item) {  
    menu_items.forEach((item) => {
      item.classList.remove("active_menu_item");
    });
    item.classList.add("active_menu_item");
    // changeContent()
}
export function show_NewProject_Form(form) {
  form.style.display = "block"
  setTimeout(() => {
    form.style.maxHeight = "200px";
    form.style.opacity = "1";
  },1)
}
export function hide_NewProject_Form() {
  let form = document.querySelector(".menu_container form");
  form.style.opacity = 0;
  form.style.maxHeight = 0;
  setTimeout(() => {
    form.style.display = "none";
  }, 370);
}
export function remove_All_Selected() {
  let menu_items = document.querySelectorAll(".menu_btn");
  menu_items.forEach((element) => {
    element.classList.remove("active_menu_item");
  })
}

export function show_Task_input() {
  let taskform = document.querySelector(".task_form");
  taskform.style.display = "flex";
  setTimeout(() => {
    taskform.style.transform = "scale(1)";
  }, 1);
}
export function hide_Task_input() {
  let taskform = document.querySelector(".task_form");
  input_title.value = "";
  input_descripton.value = "";
  taskform.style.transform = "scale(0)";
  setTimeout(() => {
    taskform.style.display = "none";
  }, 255);
}
export function handle_project_click_bg(clicked_project) {
  document.querySelectorAll(".Project_item").forEach((project) => {
    project.style.backgroundColor = "transparent;";
    project.classList.remove("active_menu_item");
    project.classList.remove("selected_project");
  })
  clicked_project.classList.add("active_menu_item");
  clicked_project.classList.add("selected_project");
}
export function show_project_tasks(project) {
  document.querySelector(".Project_tasks").style.display = "block";
  // if (project.todos.length === 0) {
  //   console.log("Empty");
  //   return;
  // }
  let task_container = document.querySelector(".tasks");
  task_container.innerHTML = "";
  project.todos.forEach((item) => {
    CreateTask_Element(item);
  });
}
