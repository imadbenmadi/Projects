function add(nbr1,nbr2){
    return nbr1 + nbr2;
}
function subtract(nbr1,nbr2){
    return nbr1 - nbr2;
}
function multiply(nbr1,nbr2){
    return nbr1 * nbr2;
}
function divide(nbr1,nbr2){
    return nbr1 / nbr2;
}
 
let number_1;
let operator;
let number_2;
function operate(number_1 , operator, number_2){
    let result;
        switch (operator) {
            case "+":
                result = add(parseFloat(number_1), parseFloat(number_2));
                break;
            case "-":
                result = subtract(parseFloat(number_1), parseFloat(number_2));
                break;
            case "*":
                result = multiply(parseFloat(number_1), parseFloat(number_2));
                break;
            case "/":
                result = divide(parseFloat(number_1), parseFloat(number_2));
                break;
            default:
                result = "Invalid operator";
                break;
        }
        screen_result.innerText = result;
}
// operate(5, "+",5);





let screen = document.querySelector(".screen");
let screen_result = screen.querySelector(".new");
let screen_previos = screen.querySelector(".previos");

let btn_container = document.querySelector(".main_bottons");
let bottons = btn_container.querySelectorAll("div");
bottons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        populate(btn);
    });
})

function populate(btn){
    
    if (!number_1 && btn.getAttribute("data-key") != "operatore") {
      number_1 = btn.getAttribute("data-key");
      screen_result.innerText += btn.getAttribute("data-key");
    }
    
    if (btn.getAttribute("class") == "operatore") {
      operator = btn.getAttribute("data-key");
      if(number_2){
         operate(number_1, operator, number_2);
      }
    }
    if (number_1 && operator && btn.getAttribute("data-key") != number_1) {
        number_2 = btn.getAttribute("data-key"); 
        screen_result.innerText += btn.getAttribute("data-key");
    }
    // if( number_1 && number_2 && operator) {
    //     operate(number_1,operator,number_2);
    // }
    
}

