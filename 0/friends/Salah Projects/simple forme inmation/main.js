function action() {
let inputall = document.querySelectorAll("input")
inputall.forEach(input => { 
    let perant = input.parentElement;
    let perantnext = perant.nextElementSibling
    let nextEle = input.nextElementSibling
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter")  {
            nextEle.click();
        }
      });
    nextEle.addEventListener("click" , check => {
  
    if (input.type === "text" && validUser(input)) {
        changclass(perant,perantnext)    
    }else if (input.type === "email" && validEmail(input)) {
        changclass(perant,perantnext) 
    }
    else if (input.type === "password" && validUser(input)) {
        changclass(perant,perantnext) 
    }else {
    perant.style.animation = "shake 0.5s ease"    
    }
    perant.addEventListener("animationend",()=> {
        perant.style.animation = ""    

    })
    
    })
//    console.log(perantnext);
    
})
}
function changclass(perant,perantnext) {
    perant.classList.add("inactive")
    perant.classList.remove("active")
    perantnext.classList.add("active")
}
function validUser(user) {
    if (user.value.length < 6) {
        console.log("not valid");
        error("#f85a36")
    } else {
        error("#57bd81")
        return true
    }
}
function validEmail(email) {
    valdtion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (valdtion.test(email.value)) {
    return true         
    }else {
       error("#f85a36")
    }
}

function error(color) {
    document.body.style.backgroundColor = color

}
action()