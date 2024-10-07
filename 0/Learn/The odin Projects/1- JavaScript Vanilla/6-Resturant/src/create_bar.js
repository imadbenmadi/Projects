export function create_bar_element() {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add("flex_center");
    
    let home_page_btn = document.createElement("div");
    let Menu_page_btn = document.createElement("div");
    let Contact_page_btn = document.createElement("div");
    
    home_page_btn.classList.add("home_page_btn");
    Menu_page_btn.classList.add("Menu_page_btn");
    Contact_page_btn.classList.add("Contact_page_btn");
    
    home_page_btn.setAttribute("data-target","home_page_element")
    Menu_page_btn.setAttribute("data-target","Menu_page_element")
    Contact_page_btn.setAttribute("data-target","contact_page_element")

    home_page_btn.textContent = "Home"
    Menu_page_btn.textContent = "Menu"
    Contact_page_btn.textContent = "Contact"

    bar.appendChild(home_page_btn);
    bar.appendChild(Menu_page_btn);
    bar.appendChild(Contact_page_btn);
    
    document.querySelector("#content").appendChild(bar);
    return bar;
}
