const myLibrary = [];
let form = document.querySelector(".new_book_form");
let form_btn = form.querySelector("button");
let new_book_btn = document.querySelector(".add_new_book_btn");
let gray_bg = document.querySelector(".gray_bg");
let books_conotainer = document.querySelector(".books_container");


function Book(author , title , nbr_pages , readed) {
    this.author = author;
    this.title = title;
    this.nbr_pages = nbr_pages;
    this.readed = readed;
}




function addBookToLibrary(event) {
    event.preventDefault();
    document.querySelectorAll(".messing_data").forEach((element) => {
      element.style.display= "none"  
    })
    document.querySelector(".error_duplicated").style.display="none"
    // Get references to the input elements
    let titleInput = document.querySelector('input[data-input-type="title"]');
    let authorInput = document.querySelector('input[data-input-type="author"]');
    let nbrPagesInput = document.querySelector('input[data-input-type="nbr_pages"]');
    let readedInput = document.querySelector('input[data-input-type="readed"]');
    
    let title = titleInput.value;
    let author = authorInput.value;
    let nbr_pages = nbrPagesInput.value;
    let readed = readedInput.checked;
    
    if (author && title && nbr_pages) {
        if (isNotDuplicateBook(title)) {
            let new_book = new Book(author, title, nbr_pages, readed)
            myLibrary.push(new_book);
            
            // Clear the input fields
            titleInput.value = "";
            authorInput.value = "";
            nbrPagesInput.value = "";
            readedInput.checked = false; // Uncheck the checkbox

            form.style.display = "none";
            gray_bg.style.display = "none"
            creat_book_card(author, title, nbr_pages, readed)
            check_empty();
        }
        else {
            document.querySelector(".error_duplicated").style.display="block"
        }
    }
    else {
        if (!title)
            titleInput.parentElement.querySelector(".messing_data").style.display = "block"
        if (!author)
            authorInput.parentElement.querySelector(".messing_data").style.display = "block"
        if (!nbr_pages)
            nbrPagesInput.parentElement.querySelector(".messing_data").style.display="block"
    }
    // creat_book_card(author , title , nbr_pages , readed)
    // display_books()

}


function isNotDuplicateBook(book_title) {
    if (!myLibrary) {
        return true; // Library is empty, not a duplicate
    }
    return !myLibrary.some((element) => element.title === book_title);

}


function creat_book_card(author , title , nbr_pages , readed) {
    let book_card = document.createElement("div");
    book_card.classList.add("book_card")
    book_card.classList.add("flex_center")
    let title_div = document.createElement("div");
    title_div.textContent = title;
    book_card.appendChild(title_div);

    let author_div = document.createElement("div");
    author_div.textContent = author;
    book_card.appendChild(author_div);

    let nbr_pages_div = document.createElement("div");
    nbr_pages_div.textContent = nbr_pages;
    book_card.appendChild(nbr_pages_div);

    let readed_div = document.createElement("div");
    if(readed){
        readed_div.textContent = "Readed";
        readed_div.classList.add("readed_card");
        
    }
    else {
        readed_div.textContent = "Not Readed";
        readed_div.classList.add("not_readed_card")
        
    }
    book_card.appendChild(readed_div);

    let delete_book_div = document.createElement("div");
    delete_book_div.textContent = "Delete";
    delete_book_div.classList.add ("Delete_book_btn");
    book_card.appendChild(delete_book_div);
    books_conotainer.appendChild(book_card);
    delete_book_div.addEventListener("click", () => {
        books_conotainer.removeChild(book_card)
        
    })

}
function check_empty(){
    if (!myLibrary) {
        document.querySelector(".no_books").style.display = "block";

    }
    else {
        document.querySelector(".no_books").style.display = "none";
    }

}






// function creat_book_card(author, title, nbr_pages, readed) {
//     let book_card = document.createElement("div");
//     book_card.classList.add("book-card"); // Add a class for styling

//     let title_div = document.createElement("div");
//     title_div.textContent = `Title: ${title}`;
//     book_card.appendChild(title_div);

//     let author_div = document.createElement("div");
//     author_div.textContent = `Author: ${author}`;
//     book_card.appendChild(author_div);

//     let nbr_pages_div = document.createElement("div");
//     nbr_pages_div.textContent = `Pages: ${nbr_pages}`;
//     book_card.appendChild(nbr_pages_div);

//     let readed_div = document.createElement("div");
//     readed_div.textContent = readed ? "Readed" : "Not Readed";
//     readed_div.classList.add(readed ? "readed_card" : "not_readed_card");
//     book_card.appendChild(readed_div);

//     let delete_book_div = document.createElement("div");
//     delete_book_div.textContent = "Delete";
//     delete_book_div.classList.add("Delete_book_btn");
//     book_card.appendChild(delete_book_div);

//     // Append the book card to a container in your HTML (you need to create this container)
//     let bookContainer = document.querySelector(".book-container"); // Change to match your container's class or ID
//     bookContainer.appendChild(book_card);
// }
// function display_books() {
//     let bookContainer = document.querySelector(".books_container"); // Change to match your container's class or ID
//     let noBooksMessage = document.querySelector(".no_books");

//     if (!myLibrary || myLibrary.length === 0) {
//         noBooksMessage.style.display = "block"; // Display the message if the library is empty
//         bookContainer.innerHTML = ""; // Clear the book container
//     } else {
//         noBooksMessage.style.display = "none"; // Hide the message if there are books

//         // Clear the book container before displaying the books
//         bookContainer.innerHTML = "";

//         // Iterate through your library and create book cards for each book
//         myLibrary.forEach((book) => {
//             creat_book_card(book.author, book.title, book.nbr_pages, book.readed);
//         });
//     }
// }





document.addEventListener("DOMContentLoaded", () => {
    new_book_btn.addEventListener("click", () => {
        gray_bg.style.display = "block";
        form.style.display = "flex"
        setTimeout(() => {
            gray_bg.classList.add("show_gray_bg");
            form.classList.add("show_new_book_form")    
        },200)
        

        gray_bg.addEventListener("click", () => {
            setTimeout(() => {
                gray_bg.classList.remove("show_gray_bg");
                form.classList.remove("show_new_book_form")    
            }, 200)
            setTimeout(() => {
                form.style.display = "none";
                gray_bg.style.display = "none"    
            },400)
            
        })

        form_btn.addEventListener("click", addBookToLibrary)


    });
});


