export class Task{
    constructor(title,description) {
        this.title = title;
        this.description = description;
        this.preority = ""
    }
}
export function CreateTask(project_obj , newTask) {
    project_obj.todos.push(newTask);   
}

export function CreateTask_Element(task) {
    let task_container = document.querySelector(".tasks");
    let task_element = document.createElement("div")
    task_element.classList.add("task_element")
    task_element.textContent = task.title + " " + task.description;
    task_container.appendChild(task_element);
}