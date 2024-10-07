// add letters using loop 

// console.log(gitLetters);
let letters = "azertyuiopqsdfghjklmwxcvbn"
let arrayLetters = Array.from(letters)
let gitLetters = document.querySelector(".letters")
// console.log(arrayLetters);
arrayLetters.forEach(letter => {

let span = document.createElement("span")
let text = document.createTextNode(letter)
span.appendChild(text)
span.className= "latter-box"
gitLetters.append(span)

})
// add word " Word From : "
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
  }
let allkeys = Object.keys(words)
let getRandvalue = Math.floor(Math.random()*allkeys.length)
let getRandName = allkeys[getRandvalue]
let RandNameNamekyes = words[getRandName]
let RandNamevaluekyes = Math.floor(Math.random()*RandNameNamekyes.length)
let randname =RandNameNamekyes[RandNamevaluekyes] 

document.querySelector(".game-info .category span").innerHTML = getRandName

// console.log(randname);

let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randname);
// console.log(lettersAndSpace);
lettersAndSpace.forEach(letter => {
// creat empty span
let span = document.createElement("span")
if (letter === ' '){
span.className = "has-space"
}
lettersGuessContainer.append(span)

})

let allSpan = document.querySelectorAll(".letters-guess span")

let theDraw = document.querySelector(".hangman-draw");
let wrongAttempts = 0
document.addEventListener("click", (e) => {
    let cheickedelement = false
    if (e.target.className == "latter-box") {
        e.target.classList.add("clicked")
        //  cheked if letter of array in the letter chosen 

        let theLetterCheked = e.target.innerHTML.toLowerCase()
        let theLatterOfArray = Array.from(randname.toLowerCase())
        theLatterOfArray.forEach((words, wordindex) => {
            if (theLetterCheked === words) {
              cheickedelement = true
                allSpan.forEach((e, indexspan) => {
                    if (wordindex == indexspan) {
                        
                        e.innerHTML = theLetterCheked
                    }
                })
    
            }
        })

        if (cheickedelement !== true) {

            // Increase The Wrong Attempts
            wrongAttempts++;
      
            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            
            document.getElementById("fail").play();

            if (wrongAttempts == 8) {
      
              
              gitLetters.classList.add("finished");
              endGame();
      
            }
      
          } else {
      
            // Play Success Sound
            document.getElementById("success").play();
      
          }
      
        }
      
      });
      
      // End Game Function
      function endGame() {
      
        // Create Popup Div
        let div = document.createElement("div");
      
        // Create Text
        let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
      
        // Append Text To Div
        div.appendChild(divText);
      
        // Add Class On Div
        div.className = 'popup';
        // Append To The Body
        document.container.appendChild(div);
      
      }
