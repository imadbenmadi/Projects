let allImg = document.querySelectorAll("img")
let  arrayIMg = Array.from(allImg)
// console.log(arrayIMg);
let lenthimg = arrayIMg.length
let courr = 1
let next = document.getElementById("next")
let prev = document.getElementById("prev")
next.onclick = nextEle
prev.onclick = prevEle


let ulEle = document.createElement("ul")

for (let i = 1; i <= lenthimg;i++ ) {
    
    let liEle = document.createElement("li")
    if (i == 1){
        liEle.classList.add("active")
    }
    liEle.setAttribute("data-value",i)
    liEle.textContent = i 
    ulEle.appendChild(liEle) 
 
}

let indicators = document.querySelector(".indicators")
indicators.appendChild(ulEle)
let lielem =  document.querySelectorAll("li")
cheker()
lielem.forEach((li)=> {
  
    
    li.addEventListener("click",() => {    
       let courr = li.getAttribute("data-value")
       saveCurr(courr)
       addClassActive(li)
       addSlider(courr)
       
    })
 
})

let getSlider = document.getElementById("slide-number")

addSlider(courr)

function addSlider(courr) {
    getSlider.textContent = `slider ${courr} from ${lenthimg}`
}
function addClassActive(li) {
    cheker()
    removeall();   
    li.classList.add("active")
    allImg[parseInt(li.getAttribute("data-value"))-1].classList.add("active")
    
}
function saveCurr(cure) {
   courr = cure
}


function nextEle() {
    courr++;
    lielem.forEach((li) => {
        
        if (parseInt(li.getAttribute("data-value")) == courr) {
            addSlider(courr)
            addClassActive(li)
            
        }
    
    })
    
    }
function prevEle() 
{
    courr--;
    lielem.forEach((li) => {
        
        if (parseInt(li.getAttribute("data-value")) == courr) {
            addClassActive(li)
            addSlider(courr)
        }
    
    })
}

function removeall() {
    lielem.forEach((ul)=> {
        
       ul.classList.remove("active")
        
    })
    allImg.forEach((ul)=> {
        ul.classList.remove("active")
         
     })

}

function cheker() {
  if (courr == 1 ) {
    prev.classList.add("disabled")
  }else  {
    prev.classList.remove("disabled")
  }
  if (courr == lenthimg ) {
    next.classList.add("disabled")
  }else  {
    next.classList.remove("disabled")
  }
}
