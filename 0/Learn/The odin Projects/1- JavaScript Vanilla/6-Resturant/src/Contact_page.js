export function contact_page() {
  let contact_page = document.createElement("div");
  contact_page.classList.add("contact_page");

  let section_title = document.createElement("div");
  section_title.classList.add("section_title");
  section_title.textContent = "Contact Us";

  let phone_number = document.createElement("div");
  phone_number.classList.add("phone_number");
  phone_number.textContent = "0657653349";

  contact_page.appendChild(section_title);
  contact_page.appendChild(phone_number);
  document.querySelector("#content").appendChild(contact_page);
  return contact_page;
}
