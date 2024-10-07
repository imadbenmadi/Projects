let container = document.querySelector(".container .elements");
let mood = "default";
let current_color = "#0000ff"


// create the initial 16x16 grid
function createGrid(size) {
    container.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let grid_block = document.createElement("div");
        grid_block.classList.add("grid_block");
        container.appendChild(grid_block);
        for (let j = 0; j < size; j++) {
            let grid_element = document.createElement("div");
            grid_element.classList.add("grid_element");
            grid_block.appendChild(grid_element);

            // Function to handle both mouseenter and touchstart events
            grid_element.addEventListener("mouseenter", () => {
                if (mood == "default")
                    grid_element.style.backgroundColor = current_color;
                else if (mood == "erase")
                    grid_element.style.backgroundColor = "white";
            });
        }
    }
}

createGrid(16); // Initialize the grid with a 16x16 size

let grid_elements = document.querySelectorAll(".grid_element");
let clear_btn = document.querySelector(".clear_btn img");
let erase_btn = document.querySelector(".erase_btn img");

// handle th eerasez evrything
clear_btn.addEventListener("click", () => {
    erase_btn.style.border = "none";
     document.querySelectorAll(".grid_element").forEach((element) => {
        element.style.backgroundColor = "white";
    });
  mood = "default"; // Reset mood to "default"
});




erase_btn.addEventListener("click", toggleEraseMode);
function toggleEraseMode() {
    if (mood == "default") {
        erase_btn.style.border = "2px solid blue";
        erase_btn.style.borderRadius = "5px";
        mood = "erase";
    } else if (mood == "erase") {
        erase_btn.style.border = "none";
        erase_btn.style.borderRadius = "0px";
        mood = "default";
    }
}



// Sub-title animation
clear_btn.addEventListener("mouseenter", () => {
    document.querySelector(".clear_btn_title").classList.add("show_title");
});

clear_btn.addEventListener("mouseleave", () => {
    document.querySelector(".clear_btn_title").classList.remove("show_title");
});

erase_btn.addEventListener("mouseenter", () => {
    document.querySelector(".erase_btn_title").classList.add("show_title");
});

erase_btn.addEventListener("mouseleave", () => {
    document.querySelector(".erase_btn_title").classList.remove("show_title");
});





// handle grid size changes
let rangeInput = document.querySelector("input[type='range']");
let gridSizeDisplay = document.querySelector(".resize_value");

rangeInput.addEventListener("input", () => {
    let newSize = rangeInput.value;
    gridSizeDisplay.textContent = newSize + "x" + newSize;
});

let generateBtn = document.querySelector(".resize_btn");

generateBtn.addEventListener("click", () => {
    let newSize = rangeInput.value;
    createGrid(newSize);
});





// hanndle the color
let color_input = document.querySelector(".color input")
color_input.addEventListener("input", () => {
  let newColor = color_input.value;
  current_color = newColor;
  document.querySelector(".color_value").innerHTML = newColor;

})


// random color section 
let randomColorBtn = document.querySelector(".random_color img");

randomColorBtn.addEventListener("click", () => {
    // Generate a random color in hexadecimal format
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

    // Set the background color to the generated random color
    // document.querySelector(".container .elements").style.backgroundColor = randomColor;
  current_color = randomColor;
  color_input.value = randomColor;
  document.querySelector(".color_value").innerHTML = randomColor
});


