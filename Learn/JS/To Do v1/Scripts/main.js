import  {selected_emoji} from "./emoji.js"
import {refresh_selected} from "./emoji.js"

let todo_items = document.getElementById("todo_items")
let error_message = document.getElementById("error_message")
let input = document.querySelector(".add_element_text")

let item
let item_logo 
let item_text
let item_check_delet 

let item_check
let item_delete;

let item_delete_span

export function setItemLogo(logoElement) {
    item_logo.innerHTML(logoElement) ;
}

function add_todo(){
    if(input.value){
         item = document.createElement('div');
         item_logo = document.createElement('div');
         item_text = document.createElement('div');
         item_check_delet = document.createElement('div');

         item_check = document.createElement('div');
         item_delete = document.createElement('div');

        //  item_logo_span = document.createElement('span');
         item_delete_span = document.createElement('span');

        

        item.className = 'todo_item';
        item_logo.className = 'todo_item_logo material-symbols-outlined';
        item_text.className = 'todo_item_text';
        item_check_delet.className = 'todo_item_check_delete';
        item_check.className = 'todo_item_check';
        item_delete.className = 'todo_item_delete material-symbols-outlined';
        

        // item_logo.appendChild(item_logo_span)
        item_delete.appendChild(item_delete_span)


        todo_items.appendChild(item)
        item.appendChild(item_logo)
        item.appendChild(item_text)
        item.appendChild(item_check_delet)
        item_check_delet.appendChild(item_check)
        item_check_delet.appendChild(item_delete)

        
        item_delete_span.textContent = 'delete';
        item_text.textContent = input.value;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        item_check.appendChild(checkbox);
        


        if(selected_emoji != null){
            item_logo.innerHTML=selected_emoji;
        }
        else if(selected_emoji == null){
            item_logo.innerHTML="📄";
        }
        else
            item_logo.innerHTML="📄";

        item_delete_span.addEventListener("click", delete_item);
        checkbox.addEventListener('click', toggleDarkerStyle);




        error_message.innerHTML =""
        input.value="";
        refresh_selected()
    }
    else{
        error_message.innerHTML = "input is empty"
    }
    
}



function delete_item(event){
    event.target.parentElement.parentElement.parentElement.remove()
}
function toggleDarkerStyle(event) {
  const checkbox = event.target;
  const todoItem = checkbox.parentElement.parentElement.parentElement;
  todoItem.classList.toggle("todo_checked_bg")
   todoItem.querySelector(".todo_item_logo ").classList.toggle('todo_item_checked');
   todoItem.querySelector(".todo_item_text").classList.toggle('todo_item_checked');

}


document.querySelector(".add_element_btn").addEventListener("click",add_todo)

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    add_todo();
  }
});




document.getElementById("add_element_logo").addEventListener("click",()=>{
    document.getElementById("emoji").classList.add("emoji_show")
})



