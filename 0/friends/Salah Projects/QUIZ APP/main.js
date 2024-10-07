// select element  
let spanCount = document.querySelector(".questions-count span");
let Bulets = document.querySelector(".bulets");
let buletscounter = document.querySelector(".bulets-counter");
let counter = document.querySelector(".counter");
let answer = document.querySelector(".answer");
let qusion = document.querySelector(".qusion");
let buten = document.querySelector(".submit-answer");
let results = document.querySelector(".results");


// set var 
let index = 0;
let theAnswerRaight = 0

function getQuestions() {
 
     let newXml = new XMLHttpRequest();

    newXml.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let jsObject = JSON.parse(this.responseText);
            
            getbulets(jsObject.length);
            creatanswer(jsObject[index],jsObject.length) 
            contDawn(5,jsObject.length)
            buten.onclick = () => {
                // console.log(index);
                checkanswer(jsObject[index]["right_answer"],jsObject.length)
                index++;
                qusion.innerHTML = " "   
                answer.innerHTML = " " 
                
                creatanswer(jsObject[index],jsObject.length) 
                checkspan()
                
                showResulte(jsObject.length)
                // console.log(jsObject[index]["right_answer"]);
                clearInterval(interval)
                contDawn(5,jsObject.length)
            }
            
            
        }
    
    }
        newXml.open("GET", "jsonquestions.json",true);
        newXml.send();
}
function contDawn (time,count){
    if (index < count) {
      
        interval = setInterval(()=> {
            let min = parseInt(time / 60)
            let sec = parseInt(time % 60)
            min = min < 10 ? `0${min}` : min;
            sec = sec < 10 ? `0${sec}` : sec;      
            counter.innerHTML =`<span>${min}</span> : <span>${sec}</span>`
            if (--time < 0) {
            clearInterval(interval)
                buten.click();
            
            
            }        
        },1000)
        
        
    }


}
function showResulte(courrant) {
    if (index === courrant) {
        answer.remove();
        qusion.remove();
        buten.remove();
        buletscounter.remove();
        if (theAnswerRaight > (courrant / 2) && theAnswerRaight < courrant ) {
            results.innerHTML = `<span class="good">good</span> your answer ${theAnswerRaight} from ${courrant}`
        }else if (theAnswerRaight === courrant ) {
            results.innerHTML = `<span class="perfect">perfect</span> your answer ${theAnswerRaight} from ${courrant}`        
       }else {
        results.innerHTML = `<span class="bad">bad</span> your answer ${theAnswerRaight} from ${courrant}`        
       
       }
        
    }
}
function checkspan() {
    let getSpan = document.querySelectorAll(".bulets span")
    let arryofspab =Array.from(getSpan)
    arryofspab.forEach((span,indx) =>  {
        if (index == indx ) {
            span.className = "true"
            // console.log(span);
        
    }
    })
}

function checkanswer(rAnswer,length) {
    // console.log(rAnswer);

        let theanswerinput
        let getallq = document.getElementsByName("answer")
        for (let index = 0; index < getallq.length; index++) {
            if (getallq[index].checked)
                theanswerinput = getallq[index].dataset.answer
    
        }
        if (rAnswer === theanswerinput) {
            // console.log(rAnswer);
            theAnswerRaight++;


    
        }
    
}
// creat span  bulats   
function getbulets(num) {
    spanCount.innerHTML = num
    for (let i = 0; i < num; i++) {
        let spanBulets = document.createElement("span");
        // if first bulet add class name true
        if (i === 0 ) {
            spanBulets.className = "true"           
        }
        Bulets.append(spanBulets);
    }
    
}


function creatanswer (inde,count) {
    if (index < count) {
        let h2 = document.createElement("h2");
        let textTitle = document.createTextNode(inde["title"]);
    
        h2.append(textTitle)
        qusion.appendChild(h2)
    
        for (let i = 1; i <= 4; i++) {
         
            let divAnswer = document.createElement("div");
            divAnswer.className = "answer-type"
            let input = document.createElement("input");
            input.id = `answer_${i}`
            input.name = "answer"
            input.type = "radio"
            input.dataset.answer = inde[`answer_${i}`]
        
        
            if (i == 1) {
                input.checked = true
            }
            let label = document.createElement("label");
            label.htmlFor = `answer_${i}`
            let labelText = document.createTextNode(inde[`answer_${i}`])
        
            label.append(labelText)
            divAnswer.appendChild(input)
            divAnswer.appendChild(label)
      
            answer.appendChild(divAnswer)
        
        }
    }
    
}


// call function 
getQuestions()
