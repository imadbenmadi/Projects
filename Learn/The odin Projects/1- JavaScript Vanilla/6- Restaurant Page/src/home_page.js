export function home_page() {
    let container = document.querySelector(".container")
    
    let home_page = document.createElement("div")
    home_page.classList.add("home_page")

    let home_page_images = document.createElement("div")
    home_page_images.classList.add("home_page_images")
    home_page_images.classList.add("flex_center")
    

    let pizza_img = document.createElement("img")
    pizza_img.classList.add("pizza_img")
    pizza_img.setAttribute("src", "Logo/pizza.png")


    let chef_img = document.createElement("img")
    chef_img.classList.add("chef_img")
    chef_img.setAttribute("src", "Logo/chef.png")
    
    home_page_images.appendChild(pizza_img)
    home_page_images.appendChild(chef_img)

    let home_page_description = document.createElement("div")
    home_page_description.classList.add("home_page_description")

    let home_page_description_1 = document.createElement("div")
    home_page_description_1.classList.add("home_page_description_1")
    home_page_description_1.textContent = "PIZZZA"
    let home_page_description_2 = document.createElement("div")
    home_page_description_2.classList.add("home_page_description_2")
    home_page_description_2.textContent = "BOSS"

    home_page_description.appendChild(home_page_description_1)
    home_page_description.appendChild(home_page_description_2)
    
    home_page.appendChild(home_page_images)
    home_page.appendChild(home_page_description)
    container.appendChild(home_page)

    return home_page;
}
