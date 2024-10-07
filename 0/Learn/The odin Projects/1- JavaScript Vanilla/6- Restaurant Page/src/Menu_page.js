export function Menu_page() {
    let container = document.querySelector(".container")
    let menu_page = document.createElement("div")
    menu_page.classList.add("menu_page")
    
    let menu_page_title = document.createElement("div")
    menu_page_title.classList.add("section_title")
    menu_page_title.textContent = "Menu"
    menu_page.appendChild(menu_page_title)

    let Menu_select = document.createElement("div")
    Menu_select.classList.add("Menu_select")
    menu_page.appendChild(Menu_select)

    let Pizza_elements = document.createElement("div")
    Pizza_elements.classList.add("Pizza_elements")
    
    
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_1.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_2.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_3.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_4.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_5.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_6.jpg")

    
    menu_page.appendChild(Pizza_elements)
    container.appendChild(menu_page)

    return menu_page;
}


function create_pizza_element(root,src) {
    let Pizza_element = document.createElement("div")
    Pizza_element.classList.add("Pizza_element")
    Pizza_element.classList.add("flex_center")
    let pizza_img = document.createElement("img")
    pizza_img.setAttribute("src", src)
    Pizza_element.appendChild(pizza_img)
    root.appendChild(Pizza_element)

    
}