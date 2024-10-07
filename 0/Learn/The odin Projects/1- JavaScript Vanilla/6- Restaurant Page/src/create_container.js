export function create_container() {
    let root = document.querySelector("#content")
    let container = document.createElement("div")
    container.classList.add("container")
    root.appendChild(container)
    return container;
}