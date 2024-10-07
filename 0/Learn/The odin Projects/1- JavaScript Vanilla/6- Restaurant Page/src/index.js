import { create_bar_element } from "./create_bar"
import { create_container } from "./create_container"
import { home_page } from "./home_page"
import { Menu_page } from "./Menu_page"
import { contact_page } from "./Contact_page"
let nav_bar_element = create_bar_element()
let container = create_container()
let home_page_element = home_page()
let Menu_page_element = Menu_page()
let contact_page_element = contact_page()


Menu_page_element.style.display = "none"
contact_page_element.style.display = "none";


let nav_bar_elements = nav_bar_element.querySelectorAll("div") 
console.log(nav_bar_elements);


nav_bar_elements.forEach((btn) => {
    btn.addEventListener("click", () => {
        changeSection(btn.getAttribute("data-target"))
    })
})

function changeSection(target) {
    home_page_element.style.display = "none"
    Menu_page_element.style.display = "none"
    contact_page_element.style.display = "none"
    if (target == "home_page_element")
        home_page_element.style.display = "block"
    if (target == "Menu_page_element")
        Menu_page_element.style.display = "block"
    if (target == "contact_page_element")
        contact_page_element.style.display = "block"
        
}